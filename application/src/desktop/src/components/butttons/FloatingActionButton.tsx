import { FloatingActionButton as NewFloatingActionButton } from "../ui";

interface FloatingActionButtonProps {
  onOpen: () => void;
}

export default function FloatingActionButton({ onOpen }: FloatingActionButtonProps) {
  return (
    <NewFloatingActionButton onClick={onOpen}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </NewFloatingActionButton>
  );
}
