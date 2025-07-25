use log::{info, error};
use std::fs;
use std::process::Command;
use std::time::{SystemTime, UNIX_EPOCH};
use std::path::PathBuf;

#[tauri::command]
async fn run_agent_code(code: String, message: String) -> Result<String, String> {
    info!("Iniciando execução do run_agent_code");
    info!("Tamanho do código recebido: {}", code.len());
    info!("Mensagem recebida: {}", message);

    // Usa uma pasta temporária do sistema
    let agents_dir: PathBuf = std::env::temp_dir().join("my_tauri_agents");
    if let Err(e) = fs::create_dir_all(&agents_dir) {
        error!("Erro ao criar pasta temporária: {}", e);
        return Err(format!("Erro ao criar pasta temporária: {}", e));
    }
    info!("Pasta temporária criada em {:?}", agents_dir);

    // Gera um nome de arquivo único com timestamp
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
    let temp_filename = agents_dir.join(format!("temp_agent_{}.py", timestamp));
    info!("Arquivo temporário: {:?}", temp_filename);

    // Escreve o código Python no arquivo
    if let Err(e) = fs::write(&temp_filename, &code) {
        error!("Erro ao escrever código no arquivo: {}", e);
        return Err(format!("Erro ao escrever código no arquivo: {}", e));
    }
    info!("Código Python escrito no arquivo temporário");

    // Executa o script Python com o argumento
    let output = Command::new("python")
        .arg(&temp_filename)
        .arg(&message)
        .env("PYTHONIOENCODING", "utf-8")
        .output();

    match output {
        Ok(output) => {
            // Remove o arquivo temporário
            let _ = fs::remove_file(&temp_filename);
            info!("Arquivo temporário removido");

            if output.status.success() {
                let resp = String::from_utf8_lossy(&output.stdout).to_string();
                info!("Execução do script Python finalizada com sucesso");
                Ok(resp)
            } else {
                let err = String::from_utf8_lossy(&output.stderr).to_string();
                error!("Erro na execução do script Python: {}", err);
                Err(err)
            }
        }
        Err(e) => {
            error!("Erro ao executar script Python: {}", e);
            Err(format!("Erro ao executar script: {}", e))
        }
    }
}

pub fn run() {
    // Inicializa logger
    env_logger::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_agent_code])
        .run(tauri::generate_context!())
        .expect("Erro ao executar aplicação Tauri");
}
