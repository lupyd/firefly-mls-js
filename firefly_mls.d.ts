/* tslint:disable */
/* eslint-disable */
export function start(): void;
export function add(left: bigint, right: bigint): bigint;
export function run_test_binding(): Promise<void>;
export enum ChannelType {
  Root = 0,
  Media = 1,
  Text = 2,
}
export enum FireflyMlsReceivedMessageKind {
  Message = 0,
  Commit = 1,
  Proposal = 2,
  GroupInfo = 3,
  Welcome = 4,
  KeyPackage = 5,
}
export enum UserPermission {
  AddMessage = 4,
  ManageChannel = 8,
  ManageRole = 16,
  ManageMember = 32,
}
export class EncryptedMessage {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  sender: string;
  message: Uint8Array;
}
export class FireflyGroupExtension {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
}
export class FireflyGroupStateStorage {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static new(get_state_handler: Function, get_epoch_handler: Function, write_handler: Function, max_epoch_id_handler: Function): FireflyGroupStateStorage;
}
export class FireflyKeyPackageStorage {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static new(insert_handler: Function, delete_handler: Function, get_handler: Function): FireflyKeyPackageStorage;
}
export class FireflyMlsClient {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  to_vec(): Uint8Array;
  static from_vec(v: Uint8Array, base_url: string, token_callback: Function, group_state_storage_get_state_handler: Function, group_state_storage_get_epoch_handler: Function, group_state_storage_write_handler: Function, group_state_storage_max_epoch_id_handler: Function, key_package_store_insert_handler: Function, key_package_store_delete_handler: Function, key_package_store_get_handler: Function): Promise<FireflyMlsClient>;
  static new(username: string, base_url: string, token_callback: Function, group_state_storage_get_state_handler: Function, group_state_storage_get_epoch_handler: Function, group_state_storage_write_handler: Function, group_state_storage_max_epoch_id_handler: Function, key_package_store_insert_handler: Function, key_package_store_delete_handler: Function, key_package_store_get_handler: Function): Promise<FireflyMlsClient>;
  username(): string | undefined;
  create_group(group_name: string): Promise<FireflyMlsGroup>;
}
export class FireflyMlsGroup {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  state(): Promise<Uint8Array>;
  extension_to_js(): Uint8Array;
  clear_proposals(): void;
  clear_pending_commit(): void;
  apply_pending_commit(): Promise<void>;
  save(): Promise<void>;
  encrypt(data: Uint8Array): Promise<Uint8Array>;
  process(message: Uint8Array): Promise<FireflyMlsReceivedMessage>;
  add_member(username: string, _package: Uint8Array, role_id: number): Promise<Uint8Array>;
  kick_member(username: string): Promise<Uint8Array>;
  update_channel(_delete: boolean, payload: Uint8Array): Promise<Uint8Array>;
  update_role(name: string, role_id: number, permissions: number, _delete: boolean): Promise<Uint8Array>;
  update_user(username: string, role_id: number): Promise<Uint8Array>;
}
export class FireflyMlsReceivedMessage {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
}
export class GroupRole {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  id: number;
  name: string;
  permissions: number;
}
export class UserPermissions {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  0: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_userpermissions_free: (a: number, b: number) => void;
  readonly __wbg_get_userpermissions_0: (a: number) => number;
  readonly __wbg_set_userpermissions_0: (a: number, b: number) => void;
  readonly __wbg_grouprole_free: (a: number, b: number) => void;
  readonly __wbg_get_grouprole_id: (a: number) => number;
  readonly __wbg_set_grouprole_id: (a: number, b: number) => void;
  readonly __wbg_get_grouprole_name: (a: number) => [number, number];
  readonly __wbg_set_grouprole_name: (a: number, b: number, c: number) => void;
  readonly __wbg_get_grouprole_permissions: (a: number) => number;
  readonly __wbg_set_grouprole_permissions: (a: number, b: number) => void;
  readonly __wbg_fireflykeypackagestorage_free: (a: number, b: number) => void;
  readonly fireflykeypackagestorage_new: (a: any, b: any, c: any) => number;
  readonly __wbg_fireflygroupstatestorage_free: (a: number, b: number) => void;
  readonly fireflygroupstatestorage_new: (a: any, b: any, c: any, d: any) => number;
  readonly start: () => void;
  readonly add: (a: bigint, b: bigint) => bigint;
  readonly run_test_binding: () => any;
  readonly __wbg_fireflygroupextension_free: (a: number, b: number) => void;
  readonly __wbg_encryptedmessage_free: (a: number, b: number) => void;
  readonly __wbg_get_encryptedmessage_sender: (a: number) => [number, number];
  readonly __wbg_set_encryptedmessage_sender: (a: number, b: number, c: number) => void;
  readonly __wbg_get_encryptedmessage_message: (a: number) => [number, number];
  readonly __wbg_set_encryptedmessage_message: (a: number, b: number, c: number) => void;
  readonly __wbg_fireflymlsreceivedmessage_free: (a: number, b: number) => void;
  readonly __wbg_fireflymlsclient_free: (a: number, b: number) => void;
  readonly fireflymlsclient_to_vec: (a: number) => [number, number, number, number];
  readonly fireflymlsclient_from_vec: (a: number, b: number, c: number, d: number, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any) => any;
  readonly fireflymlsclient_new: (a: number, b: number, c: number, d: number, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any) => any;
  readonly fireflymlsclient_username: (a: number) => [number, number];
  readonly fireflymlsclient_create_group: (a: number, b: number, c: number) => any;
  readonly __wbg_fireflymlsgroup_free: (a: number, b: number) => void;
  readonly fireflymlsgroup_state: (a: number) => any;
  readonly fireflymlsgroup_extension_to_js: (a: number) => [number, number, number, number];
  readonly fireflymlsgroup_clear_proposals: (a: number) => void;
  readonly fireflymlsgroup_clear_pending_commit: (a: number) => void;
  readonly fireflymlsgroup_apply_pending_commit: (a: number) => any;
  readonly fireflymlsgroup_save: (a: number) => any;
  readonly fireflymlsgroup_encrypt: (a: number, b: number, c: number) => any;
  readonly fireflymlsgroup_process: (a: number, b: number, c: number) => any;
  readonly fireflymlsgroup_add_member: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly fireflymlsgroup_kick_member: (a: number, b: number, c: number) => any;
  readonly fireflymlsgroup_update_channel: (a: number, b: number, c: number, d: number) => any;
  readonly fireflymlsgroup_update_role: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  readonly fireflymlsgroup_update_user: (a: number, b: number, c: number, d: number) => any;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_6: WebAssembly.Table;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly closure563_externref_shim: (a: number, b: number, c: any) => void;
  readonly wasm_bindgen__convert__closures_____invoke__h952ac79b7bcac5cb: (a: number, b: number) => void;
  readonly closure703_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
