let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

function logError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        let error = (function () {
            try {
                return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
            } catch(_) {
                return "<failed to stringify thrown value>";
            }
        }());
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
        throw e;
    }
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function _assertBoolean(n) {
    if (typeof(n) !== 'boolean') {
        throw new Error(`expected a boolean argument, found ${typeof(n)}`);
    }
}

function _assertNum(n) {
    if (typeof(n) !== 'number') throw new Error(`expected a number argument, found ${typeof(n)}`);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    }
}

function passStringToWasm0(arg, malloc, realloc) {

    if (typeof(arg) !== 'string') throw new Error(`expected a string argument, found ${typeof(arg)}`);

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);
        if (ret.read !== arg.length) throw new Error('failed to pass whole string');
        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(
state => {
    wasm.__wbindgen_export_6.get(state.dtor)(state.a, state.b);
}
);

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_6.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

export function start() {
    wasm.start();
}

function _assertBigInt(n) {
    if (typeof(n) !== 'bigint') throw new Error(`expected a bigint argument, found ${typeof(n)}`);
}
/**
 * @param {bigint} left
 * @param {bigint} right
 * @returns {bigint}
 */
export function add(left, right) {
    _assertBigInt(left);
    _assertBigInt(right);
    const ret = wasm.add(left, right);
    return BigInt.asUintN(64, ret);
}

/**
 * @returns {Promise<void>}
 */
export function run_test_binding() {
    const ret = wasm.run_test_binding();
    return ret;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}
function __wbg_adapter_14(arg0, arg1) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.wasm_bindgen__convert__closures_____invoke__hddbc8a92f66cc1a7(arg0, arg1);
}

function __wbg_adapter_17(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure550_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_173(arg0, arg1, arg2, arg3) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure764_externref_shim(arg0, arg1, arg2, arg3);
}

/**
 * @enum {0 | 1 | 2}
 */
export const ChannelType = Object.freeze({
    Root: 0, "0": "Root",
    Media: 1, "1": "Media",
    Text: 2, "2": "Text",
});
/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const FireflyMlsReceivedMessageKind = Object.freeze({
    Message: 0, "0": "Message",
    Commit: 1, "1": "Commit",
    Proposal: 2, "2": "Proposal",
    GroupInfo: 3, "3": "GroupInfo",
    Welcome: 4, "4": "Welcome",
    KeyPackage: 5, "5": "KeyPackage",
});
/**
 * @enum {4 | 8 | 16 | 32}
 */
export const UserPermission = Object.freeze({
    AddMessage: 4, "4": "AddMessage",
    ManageChannel: 8, "8": "ManageChannel",
    ManageRole: 16, "16": "ManageRole",
    ManageMember: 32, "32": "ManageMember",
});

const __wbindgen_enum_RequestCache = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];

const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];

const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];

const EncryptedMessageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_encryptedmessage_free(ptr >>> 0, 1));

export class EncryptedMessage {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EncryptedMessageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_encryptedmessage_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get sender() {
        let deferred1_0;
        let deferred1_1;
        try {
            if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
            _assertNum(this.__wbg_ptr);
            const ret = wasm.__wbg_get_encryptedmessage_sender(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set sender(arg0) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_encryptedmessage_sender(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {Uint8Array}
     */
    get message() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.__wbg_get_encryptedmessage_message(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {Uint8Array} arg0
     */
    set message(arg0) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_encryptedmessage_message(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) EncryptedMessage.prototype[Symbol.dispose] = EncryptedMessage.prototype.free;

const FireflyGroupStateStorageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fireflygroupstatestorage_free(ptr >>> 0, 1));

export class FireflyGroupStateStorage {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FireflyGroupStateStorage.prototype);
        obj.__wbg_ptr = ptr;
        FireflyGroupStateStorageFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FireflyGroupStateStorageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fireflygroupstatestorage_free(ptr, 0);
    }
    /**
     * @param {Function} get_state_handler
     * @param {Function} get_epoch_handler
     * @param {Function} write_handler
     * @param {Function} max_epoch_id_handler
     * @returns {FireflyGroupStateStorage}
     */
    static new(get_state_handler, get_epoch_handler, write_handler, max_epoch_id_handler) {
        const ret = wasm.fireflygroupstatestorage_new(get_state_handler, get_epoch_handler, write_handler, max_epoch_id_handler);
        return FireflyGroupStateStorage.__wrap(ret);
    }
}
if (Symbol.dispose) FireflyGroupStateStorage.prototype[Symbol.dispose] = FireflyGroupStateStorage.prototype.free;

const FireflyKeyPackageStorageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fireflykeypackagestorage_free(ptr >>> 0, 1));

export class FireflyKeyPackageStorage {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FireflyKeyPackageStorage.prototype);
        obj.__wbg_ptr = ptr;
        FireflyKeyPackageStorageFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FireflyKeyPackageStorageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fireflykeypackagestorage_free(ptr, 0);
    }
    /**
     * @param {Function} insert_handler
     * @param {Function} delete_handler
     * @param {Function} get_handler
     * @returns {FireflyKeyPackageStorage}
     */
    static new(insert_handler, delete_handler, get_handler) {
        const ret = wasm.fireflykeypackagestorage_new(insert_handler, delete_handler, get_handler);
        return FireflyKeyPackageStorage.__wrap(ret);
    }
}
if (Symbol.dispose) FireflyKeyPackageStorage.prototype[Symbol.dispose] = FireflyKeyPackageStorage.prototype.free;

const FireflyMlsClientFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fireflymlsclient_free(ptr >>> 0, 1));

export class FireflyMlsClient {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FireflyMlsClient.prototype);
        obj.__wbg_ptr = ptr;
        FireflyMlsClientFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FireflyMlsClientFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fireflymlsclient_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    to_vec() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.fireflymlsclient_to_vec(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {Uint8Array} v
     * @param {string} base_url
     * @param {Function} token_callback
     * @param {Function} group_state_storage_get_state_handler
     * @param {Function} group_state_storage_get_epoch_handler
     * @param {Function} group_state_storage_write_handler
     * @param {Function} group_state_storage_max_epoch_id_handler
     * @param {Function} key_package_store_insert_handler
     * @param {Function} key_package_store_delete_handler
     * @param {Function} key_package_store_get_handler
     * @returns {Promise<FireflyMlsClient>}
     */
    static from_vec(v, base_url, token_callback, group_state_storage_get_state_handler, group_state_storage_get_epoch_handler, group_state_storage_write_handler, group_state_storage_max_epoch_id_handler, key_package_store_insert_handler, key_package_store_delete_handler, key_package_store_get_handler) {
        const ptr0 = passArray8ToWasm0(v, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(base_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.fireflymlsclient_from_vec(ptr0, len0, ptr1, len1, token_callback, group_state_storage_get_state_handler, group_state_storage_get_epoch_handler, group_state_storage_write_handler, group_state_storage_max_epoch_id_handler, key_package_store_insert_handler, key_package_store_delete_handler, key_package_store_get_handler);
        return ret;
    }
    /**
     * @param {string} username
     * @param {string} base_url
     * @param {Function} token_callback
     * @param {Function} group_state_storage_get_state_handler
     * @param {Function} group_state_storage_get_epoch_handler
     * @param {Function} group_state_storage_write_handler
     * @param {Function} group_state_storage_max_epoch_id_handler
     * @param {Function} key_package_store_insert_handler
     * @param {Function} key_package_store_delete_handler
     * @param {Function} key_package_store_get_handler
     * @returns {Promise<FireflyMlsClient>}
     */
    static new(username, base_url, token_callback, group_state_storage_get_state_handler, group_state_storage_get_epoch_handler, group_state_storage_write_handler, group_state_storage_max_epoch_id_handler, key_package_store_insert_handler, key_package_store_delete_handler, key_package_store_get_handler) {
        const ptr0 = passStringToWasm0(username, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(base_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.fireflymlsclient_new(ptr0, len0, ptr1, len1, token_callback, group_state_storage_get_state_handler, group_state_storage_get_epoch_handler, group_state_storage_write_handler, group_state_storage_max_epoch_id_handler, key_package_store_insert_handler, key_package_store_delete_handler, key_package_store_get_handler);
        return ret;
    }
    /**
     * @returns {string | undefined}
     */
    username() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.fireflymlsclient_username(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @returns {Promise<FireflyMlsGroup>}
     */
    create_group() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.fireflymlsclient_create_group(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) FireflyMlsClient.prototype[Symbol.dispose] = FireflyMlsClient.prototype.free;

const FireflyMlsGroupFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fireflymlsgroup_free(ptr >>> 0, 1));

export class FireflyMlsGroup {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FireflyMlsGroup.prototype);
        obj.__wbg_ptr = ptr;
        FireflyMlsGroupFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FireflyMlsGroupFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fireflymlsgroup_free(ptr, 0);
    }
    clear_proposals() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        wasm.fireflymlsgroup_clear_proposals(this.__wbg_ptr);
    }
    clear_pending_commit() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        wasm.fireflymlsgroup_clear_pending_commit(this.__wbg_ptr);
    }
    /**
     * @returns {Promise<void>}
     */
    apply_pending_commit() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.fireflymlsgroup_apply_pending_commit(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Promise<void>}
     */
    save() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.fireflymlsgroup_save(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @returns {Promise<Uint8Array>}
     */
    encrypt(data) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fireflymlsgroup_encrypt(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {Uint8Array} message
     * @returns {Promise<FireflyMlsReceivedMessage>}
     */
    process(message) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fireflymlsgroup_process(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string} username
     * @param {Uint8Array} _package
     * @param {number} role_id
     * @returns {Promise<Uint8Array>}
     */
    add_member(username, _package, role_id) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passStringToWasm0(username, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(_package, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        _assertNum(role_id);
        const ret = wasm.fireflymlsgroup_add_member(this.__wbg_ptr, ptr0, len0, ptr1, len1, role_id);
        return ret;
    }
    /**
     * @param {string} username
     * @returns {Promise<Uint8Array>}
     */
    kick_member(username) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passStringToWasm0(username, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fireflymlsgroup_kick_member(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {number} id
     * @param {string} name
     * @param {ChannelType} ty
     * @param {Map<any, any>} permissions
     * @param {boolean} _delete
     * @returns {Promise<Uint8Array>}
     */
    update_channel(id, name, ty, permissions, _delete) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        _assertNum(id);
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertNum(ty);
        _assertBoolean(_delete);
        const ret = wasm.fireflymlsgroup_update_channel(this.__wbg_ptr, id, ptr0, len0, ty, permissions, _delete);
        return ret;
    }
    /**
     * @param {string} name
     * @param {number} role_id
     * @param {number} permissions
     * @param {boolean} _delete
     * @returns {Promise<Uint8Array>}
     */
    update_role(name, role_id, permissions, _delete) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertNum(role_id);
        _assertNum(permissions);
        _assertBoolean(_delete);
        const ret = wasm.fireflymlsgroup_update_role(this.__wbg_ptr, ptr0, len0, role_id, permissions, _delete);
        return ret;
    }
    /**
     * @param {string} username
     * @param {number} role_id
     * @returns {Promise<Uint8Array>}
     */
    update_user(username, role_id) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passStringToWasm0(username, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertNum(role_id);
        const ret = wasm.fireflymlsgroup_update_user(this.__wbg_ptr, ptr0, len0, role_id);
        return ret;
    }
}
if (Symbol.dispose) FireflyMlsGroup.prototype[Symbol.dispose] = FireflyMlsGroup.prototype.free;

const FireflyMlsReceivedMessageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fireflymlsreceivedmessage_free(ptr >>> 0, 1));

export class FireflyMlsReceivedMessage {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FireflyMlsReceivedMessage.prototype);
        obj.__wbg_ptr = ptr;
        FireflyMlsReceivedMessageFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FireflyMlsReceivedMessageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fireflymlsreceivedmessage_free(ptr, 0);
    }
}
if (Symbol.dispose) FireflyMlsReceivedMessage.prototype[Symbol.dispose] = FireflyMlsReceivedMessage.prototype.free;

const GroupRoleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_grouprole_free(ptr >>> 0, 1));

export class GroupRole {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GroupRoleFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_grouprole_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get id() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.__wbg_get_grouprole_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set id(arg0) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        _assertNum(arg0);
        wasm.__wbg_set_grouprole_id(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {string}
     */
    get name() {
        let deferred1_0;
        let deferred1_1;
        try {
            if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
            _assertNum(this.__wbg_ptr);
            const ret = wasm.__wbg_get_grouprole_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set name(arg0) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_grouprole_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number}
     */
    get permissions() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.__wbg_get_grouprole_permissions(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set permissions(arg0) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        _assertNum(arg0);
        wasm.__wbg_set_grouprole_permissions(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) GroupRole.prototype[Symbol.dispose] = GroupRole.prototype.free;

const UserPermissionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_userpermissions_free(ptr >>> 0, 1));

export class UserPermissions {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UserPermissionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_userpermissions_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get 0() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.__wbg_get_userpermissions_0(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set 0(arg0) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        _assertNum(arg0);
        wasm.__wbg_set_userpermissions_0(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) UserPermissions.prototype[Symbol.dispose] = UserPermissions.prototype.free;

export function __wbg_Error_e17e777aac105295() { return logError(function (arg0, arg1) {
    const ret = Error(getStringFromWasm0(arg0, arg1));
    return ret;
}, arguments) };

export function __wbg_abort_67e1b49bf6614565() { return logError(function (arg0) {
    arg0.abort();
}, arguments) };

export function __wbg_abort_d830bf2e9aa6ec5b() { return logError(function (arg0, arg1) {
    arg0.abort(arg1);
}, arguments) };

export function __wbg_append_72a3c0addd2bce38() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_arrayBuffer_9c99b8e2809e8cbb() { return handleError(function (arg0) {
    const ret = arg0.arrayBuffer();
    return ret;
}, arguments) };

export function __wbg_call_13410aac570ffff7() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

export function __wbg_call_641db1bb5db5a579() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.call(arg1, arg2, arg3);
    return ret;
}, arguments) };

export function __wbg_call_a5400b25a865cfd8() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_call_e1bdd86bd1bc0f12() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    const ret = arg0.call(arg1, arg2, arg3, arg4, arg5);
    return ret;
}, arguments) };

export function __wbg_clearTimeout_6222fede17abcb1a() { return logError(function (arg0) {
    const ret = clearTimeout(arg0);
    return ret;
}, arguments) };

export function __wbg_crypto_574e78ad8b13b65f() { return logError(function (arg0) {
    const ret = arg0.crypto;
    return ret;
}, arguments) };

export function __wbg_debug_c906769d2f88c17b() { return logError(function (arg0) {
    console.debug(arg0);
}, arguments) };

export function __wbg_done_75ed0ee6dd243d9d() { return logError(function (arg0) {
    const ret = arg0.done;
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_entries_7a842f4caac72cb9() { return logError(function (arg0) {
    const ret = arg0.entries();
    return ret;
}, arguments) };

export function __wbg_error_7534b8e9a36f1ab4() { return logError(function (arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
}, arguments) };

export function __wbg_error_99981e16d476aa5c() { return logError(function (arg0) {
    console.error(arg0);
}, arguments) };

export function __wbg_fetch_87aed7f306ec6d63() { return logError(function (arg0, arg1) {
    const ret = arg0.fetch(arg1);
    return ret;
}, arguments) };

export function __wbg_fetch_f156d10be9a5c88a() { return logError(function (arg0) {
    const ret = fetch(arg0);
    return ret;
}, arguments) };

export function __wbg_fireflymlsclient_new() { return logError(function (arg0) {
    const ret = FireflyMlsClient.__wrap(arg0);
    return ret;
}, arguments) };

export function __wbg_fireflymlsgroup_new() { return logError(function (arg0) {
    const ret = FireflyMlsGroup.__wrap(arg0);
    return ret;
}, arguments) };

export function __wbg_fireflymlsreceivedmessage_new() { return logError(function (arg0) {
    const ret = FireflyMlsReceivedMessage.__wrap(arg0);
    return ret;
}, arguments) };

export function __wbg_getRandomValues_b8f5dbd5f3995a9e() { return handleError(function (arg0, arg1) {
    arg0.getRandomValues(arg1);
}, arguments) };

export function __wbg_get_0da715ceaecea5c8() { return logError(function (arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
}, arguments) };

export function __wbg_get_458e874b43b18b25() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments) };

export function __wbg_has_b89e451f638123e3() { return handleError(function (arg0, arg1) {
    const ret = Reflect.has(arg0, arg1);
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_headers_29fec3c72865cd75() { return logError(function (arg0) {
    const ret = arg0.headers;
    return ret;
}, arguments) };

export function __wbg_info_6cf68c1a86a92f6a() { return logError(function (arg0) {
    console.info(arg0);
}, arguments) };

export function __wbg_instanceof_Response_50fde2cd696850bf() { return logError(function (arg0) {
    let result;
    try {
        result = arg0 instanceof Response;
    } catch (_) {
        result = false;
    }
    const ret = result;
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_instanceof_Uint8Array_9a8378d955933db7() { return logError(function (arg0) {
    let result;
    try {
        result = arg0 instanceof Uint8Array;
    } catch (_) {
        result = false;
    }
    const ret = result;
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_isArray_030cce220591fb41() { return logError(function (arg0) {
    const ret = Array.isArray(arg0);
    _assertBoolean(ret);
    return ret;
}, arguments) };

export function __wbg_iterator_f370b34483c71a1c() { return logError(function () {
    const ret = Symbol.iterator;
    return ret;
}, arguments) };

export function __wbg_length_6bb7e81f9d7713e4() { return logError(function (arg0) {
    const ret = arg0.length;
    _assertNum(ret);
    return ret;
}, arguments) };

export function __wbg_msCrypto_a61aeb35a24c1329() { return logError(function (arg0) {
    const ret = arg0.msCrypto;
    return ret;
}, arguments) };

export function __wbg_new_19c25a3f2fa63a02() { return logError(function () {
    const ret = new Object();
    return ret;
}, arguments) };

export function __wbg_new_2e3c58a15f39f5f9() { return logError(function (arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_173(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return ret;
    } finally {
        state0.a = state0.b = 0;
    }
}, arguments) };

export function __wbg_new_2ff1f68f3676ea53() { return logError(function () {
    const ret = new Map();
    return ret;
}, arguments) };

export function __wbg_new_638ebfaedbf32a5e() { return logError(function (arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
}, arguments) };

export function __wbg_new_66b9434b4e59b63e() { return handleError(function () {
    const ret = new AbortController();
    return ret;
}, arguments) };

export function __wbg_new_8a6f238a6ece86ea() { return logError(function () {
    const ret = new Error();
    return ret;
}, arguments) };

export function __wbg_new_f6e53210afea8e45() { return handleError(function () {
    const ret = new Headers();
    return ret;
}, arguments) };

export function __wbg_newfromslice_074c56947bd43469() { return logError(function (arg0, arg1) {
    const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
    return ret;
}, arguments) };

export function __wbg_newnoargs_254190557c45b4ec() { return logError(function (arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
}, arguments) };

export function __wbg_newwithlength_a167dcc7aaa3ba77() { return logError(function (arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
}, arguments) };

export function __wbg_newwithstrandinit_b5d168a29a3fd85f() { return handleError(function (arg0, arg1, arg2) {
    const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
    return ret;
}, arguments) };

export function __wbg_next_5b3530e612fde77d() { return logError(function (arg0) {
    const ret = arg0.next;
    return ret;
}, arguments) };

export function __wbg_next_692e82279131b03c() { return handleError(function (arg0) {
    const ret = arg0.next();
    return ret;
}, arguments) };

export function __wbg_node_905d3e251edff8a2() { return logError(function (arg0) {
    const ret = arg0.node;
    return ret;
}, arguments) };

export function __wbg_process_dc0fbacc7c1c06f7() { return logError(function (arg0) {
    const ret = arg0.process;
    return ret;
}, arguments) };

export function __wbg_prototypesetcall_3d4a26c1ed734349() { return logError(function (arg0, arg1, arg2) {
    Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
}, arguments) };

export function __wbg_queueMicrotask_25d0739ac89e8c88() { return logError(function (arg0) {
    queueMicrotask(arg0);
}, arguments) };

export function __wbg_queueMicrotask_4488407636f5bf24() { return logError(function (arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
}, arguments) };

export function __wbg_randomFillSync_ac0988aba3254290() { return handleError(function (arg0, arg1) {
    arg0.randomFillSync(arg1);
}, arguments) };

export function __wbg_require_60cc747a6bc5215a() { return handleError(function () {
    const ret = module.require;
    return ret;
}, arguments) };

export function __wbg_resolve_4055c623acdd6a1b() { return logError(function (arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
}, arguments) };

export function __wbg_setTimeout_2b339866a2aa3789() { return logError(function (arg0, arg1) {
    const ret = setTimeout(arg0, arg1);
    return ret;
}, arguments) };

export function __wbg_set_b7f1cf4fae26fe2a() { return logError(function (arg0, arg1, arg2) {
    const ret = arg0.set(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_setbody_c8460bdf44147df8() { return logError(function (arg0, arg1) {
    arg0.body = arg1;
}, arguments) };

export function __wbg_setcache_90ca4ad8a8ad40d3() { return logError(function (arg0, arg1) {
    arg0.cache = __wbindgen_enum_RequestCache[arg1];
}, arguments) };

export function __wbg_setcredentials_9cd60d632c9d5dfc() { return logError(function (arg0, arg1) {
    arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
}, arguments) };

export function __wbg_setheaders_0052283e2f3503d1() { return logError(function (arg0, arg1) {
    arg0.headers = arg1;
}, arguments) };

export function __wbg_setmethod_9b504d5b855b329c() { return logError(function (arg0, arg1, arg2) {
    arg0.method = getStringFromWasm0(arg1, arg2);
}, arguments) };

export function __wbg_setmode_a23e1a2ad8b512f8() { return logError(function (arg0, arg1) {
    arg0.mode = __wbindgen_enum_RequestMode[arg1];
}, arguments) };

export function __wbg_setsignal_8c45ad1247a74809() { return logError(function (arg0, arg1) {
    arg0.signal = arg1;
}, arguments) };

export function __wbg_signal_da4d466ce86118b5() { return logError(function (arg0) {
    const ret = arg0.signal;
    return ret;
}, arguments) };

export function __wbg_stack_0ed75d68575b0f3c() { return logError(function (arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_static_accessor_GLOBAL_8921f820c2ce3f12() { return logError(function () {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184() { return logError(function () {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_static_accessor_SELF_995b214ae681ff99() { return logError(function () {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_static_accessor_WINDOW_cde3890479c675ea() { return logError(function () {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_status_3fea3036088621d6() { return logError(function (arg0) {
    const ret = arg0.status;
    _assertNum(ret);
    return ret;
}, arguments) };

export function __wbg_stringify_b98c93d0a190446a() { return handleError(function (arg0) {
    const ret = JSON.stringify(arg0);
    return ret;
}, arguments) };

export function __wbg_subarray_70fd07feefe14294() { return logError(function (arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
}, arguments) };

export function __wbg_then_b33a773d723afa3e() { return logError(function (arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_then_e22500defe16819f() { return logError(function (arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
}, arguments) };

export function __wbg_trace_35fb759d93114630() { return logError(function (arg0) {
    console.trace(arg0);
}, arguments) };

export function __wbg_url_e5720dfacf77b05e() { return logError(function (arg0, arg1) {
    const ret = arg1.url;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_value_dd9372230531eade() { return logError(function (arg0) {
    const ret = arg0.value;
    return ret;
}, arguments) };

export function __wbg_versions_c01dfd4722a88165() { return logError(function (arg0) {
    const ret = arg0.versions;
    return ret;
}, arguments) };

export function __wbg_warn_e2ada06313f92f09() { return logError(function (arg0) {
    console.warn(arg0);
}, arguments) };

export function __wbg_wbindgencbdrop_eb10308566512b88(arg0) {
    const obj = arg0.original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    _assertBoolean(ret);
    return ret;
};

export function __wbg_wbindgendebugstring_99ef257a3ddda34d(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_wbindgenisfunction_8cee7dce3725ae74(arg0) {
    const ret = typeof(arg0) === 'function';
    _assertBoolean(ret);
    return ret;
};

export function __wbg_wbindgenisnull_f3037694abe4d97a(arg0) {
    const ret = arg0 === null;
    _assertBoolean(ret);
    return ret;
};

export function __wbg_wbindgenisobject_307a53c6bd97fbf8(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    _assertBoolean(ret);
    return ret;
};

export function __wbg_wbindgenisstring_d4fa939789f003b0(arg0) {
    const ret = typeof(arg0) === 'string';
    _assertBoolean(ret);
    return ret;
};

export function __wbg_wbindgenisundefined_c4b71d073b92f3c5(arg0) {
    const ret = arg0 === undefined;
    _assertBoolean(ret);
    return ret;
};

export function __wbg_wbindgennumberget_f74b4c7525ac05cb(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    if (!isLikeNone(ret)) {
        _assertNum(ret);
    }
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

export function __wbg_wbindgenstringget_0f16a6ddddef376f(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_wbindgenthrow_451ec1a8469d7eb6(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_cast_2241b6af4c4b2941() { return logError(function (arg0, arg1) {
    // Cast intrinsic for `Ref(String) -> Externref`.
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
}, arguments) };

export function __wbindgen_cast_4625c577ab2ec9ee() { return logError(function (arg0) {
    // Cast intrinsic for `U64 -> Externref`.
    const ret = BigInt.asUintN(64, arg0);
    return ret;
}, arguments) };

export function __wbindgen_cast_4bdd81be241a5b48() { return logError(function (arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { dtor_idx: 549, function: Function { arguments: [Externref], shim_idx: 550, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, 549, __wbg_adapter_17);
    return ret;
}, arguments) };

export function __wbindgen_cast_77bc3e92745e9a35() { return logError(function (arg0, arg1) {
    var v0 = getArrayU8FromWasm0(arg0, arg1).slice();
    wasm.__wbindgen_free(arg0, arg1 * 1, 1);
    // Cast intrinsic for `Vector(U8) -> Externref`.
    const ret = v0;
    return ret;
}, arguments) };

export function __wbindgen_cast_cb9088102bce6b30() { return logError(function (arg0, arg1) {
    // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
    const ret = getArrayU8FromWasm0(arg0, arg1);
    return ret;
}, arguments) };

export function __wbindgen_cast_db65bdc9792f9276() { return logError(function (arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { dtor_idx: 473, function: Function { arguments: [], shim_idx: 474, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, 473, __wbg_adapter_14);
    return ret;
}, arguments) };

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

