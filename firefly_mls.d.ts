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
  create_group(): Promise<FireflyMlsGroup>;
}
export class FireflyMlsGroup {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  state(): Promise<Uint8Array>;
  extension_to_js(): string;
  clear_proposals(): void;
  clear_pending_commit(): void;
  apply_pending_commit(): Promise<void>;
  save(): Promise<void>;
  encrypt(data: Uint8Array): Promise<Uint8Array>;
  process(message: Uint8Array): Promise<FireflyMlsReceivedMessage>;
  add_member(username: string, _package: Uint8Array, role_id: number): Promise<Uint8Array>;
  kick_member(username: string): Promise<Uint8Array>;
  update_channel(id: number, name: string, ty: ChannelType, permissions: Map<any, any>, _delete: boolean): Promise<Uint8Array>;
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
