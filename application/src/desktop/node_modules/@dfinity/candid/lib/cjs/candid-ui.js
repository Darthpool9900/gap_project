"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Render = exports.vecForm = exports.optForm = exports.variantForm = exports.tupleForm = exports.recordForm = exports.inputBox = void 0;
exports.renderInput = renderInput;
exports.renderValue = renderValue;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const IDL = __importStar(require("./idl.js"));
const principal_1 = require("@dfinity/principal");
const UI = __importStar(require("./candid-core.js"));
const InputConfig = { parse: parsePrimitive };
const FormConfig = { render: renderInput };
const inputBox = (t, config) => {
    return new UI.InputBox(t, { ...InputConfig, ...config });
};
exports.inputBox = inputBox;
const recordForm = (fields, config) => {
    return new UI.RecordForm(fields, { ...FormConfig, ...config });
};
exports.recordForm = recordForm;
const tupleForm = (components, config) => {
    return new UI.TupleForm(components, { ...FormConfig, ...config });
};
exports.tupleForm = tupleForm;
const variantForm = (fields, config) => {
    return new UI.VariantForm(fields, { ...FormConfig, ...config });
};
exports.variantForm = variantForm;
const optForm = (ty, config) => {
    return new UI.OptionForm(ty, { ...FormConfig, ...config });
};
exports.optForm = optForm;
const vecForm = (ty, config) => {
    return new UI.VecForm(ty, { ...FormConfig, ...config });
};
exports.vecForm = vecForm;
class Render extends IDL.Visitor {
    visitType(t, _d) {
        const input = document.createElement('input');
        input.classList.add('argument');
        input.placeholder = t.display();
        return (0, exports.inputBox)(t, { input });
    }
    visitNull(t, _d) {
        return (0, exports.inputBox)(t, {});
    }
    visitRecord(t, fields, _d) {
        let config = {};
        if (fields.length > 1) {
            const container = document.createElement('div');
            container.classList.add('popup-form');
            config = { container };
        }
        const form = (0, exports.recordForm)(fields, config);
        return (0, exports.inputBox)(t, { form });
    }
    visitTuple(t, components, _d) {
        let config = {};
        if (components.length > 1) {
            const container = document.createElement('div');
            container.classList.add('popup-form');
            config = { container };
        }
        const form = (0, exports.tupleForm)(components, config);
        return (0, exports.inputBox)(t, { form });
    }
    visitVariant(t, fields, _d) {
        const select = document.createElement('select');
        for (const [key, _type] of fields) {
            const option = new Option(key);
            select.add(option);
        }
        select.selectedIndex = -1;
        select.classList.add('open');
        const config = { open: select, event: 'change' };
        const form = (0, exports.variantForm)(fields, config);
        return (0, exports.inputBox)(t, { form });
    }
    visitOpt(t, ty, _d) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('open');
        const form = (0, exports.optForm)(ty, { open: checkbox, event: 'change' });
        return (0, exports.inputBox)(t, { form });
    }
    visitVec(t, ty, _d) {
        const len = document.createElement('input');
        len.type = 'number';
        len.min = '0';
        len.max = '100';
        len.style.width = '8rem';
        len.placeholder = 'len';
        len.classList.add('open');
        const container = document.createElement('div');
        container.classList.add('popup-form');
        const form = (0, exports.vecForm)(ty, { open: len, event: 'change', container });
        return (0, exports.inputBox)(t, { form });
    }
    visitRec(_t, ty, _d) {
        return renderInput(ty);
    }
}
exports.Render = Render;
class Parse extends IDL.Visitor {
    visitNull(_t, _v) {
        return null;
    }
    visitBool(_t, v) {
        if (v === 'true') {
            return true;
        }
        if (v === 'false') {
            return false;
        }
        throw new Error(`Cannot parse ${v} as boolean`);
    }
    visitText(_t, v) {
        return v;
    }
    visitFloat(_t, v) {
        return parseFloat(v);
    }
    visitFixedInt(t, v) {
        if (t._bits <= 32) {
            return parseInt(v, 10);
        }
        else {
            return BigInt(v);
        }
    }
    visitFixedNat(t, v) {
        if (t._bits <= 32) {
            return parseInt(v, 10);
        }
        else {
            return BigInt(v);
        }
    }
    visitNumber(_t, v) {
        return BigInt(v);
    }
    visitPrincipal(_t, v) {
        return principal_1.Principal.fromText(v);
    }
    visitService(_t, v) {
        return principal_1.Principal.fromText(v);
    }
    visitFunc(_t, v) {
        const x = v.split('.', 2);
        return [principal_1.Principal.fromText(x[0]), x[1]];
    }
}
class Random extends IDL.Visitor {
    visitNull(_t, _v) {
        return null;
    }
    visitBool(_t, _v) {
        return Math.random() < 0.5;
    }
    visitText(_t, _v) {
        return Math.random().toString(36).substring(6);
    }
    visitFloat(_t, _v) {
        return Math.random();
    }
    visitInt(_t, _v) {
        return BigInt(this.generateNumber(true));
    }
    visitNat(_t, _v) {
        return BigInt(this.generateNumber(false));
    }
    visitFixedInt(t, v) {
        const x = this.generateNumber(true);
        if (t._bits <= 32) {
            return x;
        }
        else {
            return BigInt(v);
        }
    }
    visitFixedNat(t, v) {
        const x = this.generateNumber(false);
        if (t._bits <= 32) {
            return x;
        }
        else {
            return BigInt(v);
        }
    }
    generateNumber(signed) {
        const num = Math.floor(Math.random() * 100);
        if (signed && Math.random() < 0.5) {
            return -num;
        }
        else {
            return num;
        }
    }
}
function parsePrimitive(t, config, d) {
    if (config.random && d === '') {
        return t.accept(new Random(), d);
    }
    else {
        return t.accept(new Parse(), d);
    }
}
/**
 *
 * @param t an IDL type
 * @returns an input for that type
 */
function renderInput(t) {
    return t.accept(new Render(), null);
}
/**
 *
 * @param t an IDL Type
 * @param input an InputBox
 * @param value any
 * @returns rendering that value to the provided input
 */
function renderValue(t, input, value) {
    return t.accept(new RenderValue(), { input, value });
}
class RenderValue extends IDL.Visitor {
    visitType(t, d) {
        d.input.ui.input.value = t.valueToString(d.value);
    }
    visitNull(_t, _d) { }
    visitText(_t, d) {
        d.input.ui.input.value = d.value;
    }
    visitRec(_t, ty, d) {
        renderValue(ty, d.input, d.value);
    }
    visitOpt(_t, ty, d) {
        if (d.value.length === 0) {
            return;
        }
        else {
            const form = d.input.ui.form;
            const open = form.ui.open;
            open.checked = true;
            open.dispatchEvent(new Event(form.ui.event));
            renderValue(ty, form.form[0], d.value[0]);
        }
    }
    visitRecord(_t, fields, d) {
        const form = d.input.ui.form;
        fields.forEach(([key, type], i) => {
            renderValue(type, form.form[i], d.value[key]);
        });
    }
    visitTuple(_t, components, d) {
        const form = d.input.ui.form;
        components.forEach((type, i) => {
            renderValue(type, form.form[i], d.value[i]);
        });
    }
    visitVariant(_t, fields, d) {
        const form = d.input.ui.form;
        const selected = Object.entries(d.value)[0];
        fields.forEach(([key, type], i) => {
            if (key === selected[0]) {
                const open = form.ui.open;
                open.selectedIndex = i;
                open.dispatchEvent(new Event(form.ui.event));
                renderValue(type, form.form[0], selected[1]);
            }
        });
    }
    visitVec(_t, ty, d) {
        const form = d.input.ui.form;
        const len = d.value.length;
        const open = form.ui.open;
        open.value = len;
        open.dispatchEvent(new Event(form.ui.event));
        d.value.forEach((v, i) => {
            renderValue(ty, form.form[i], v);
        });
    }
}
//# sourceMappingURL=candid-ui.js.map