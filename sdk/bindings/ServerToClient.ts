// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { AckMessage } from "./AckMessage";
import type { AppDisconnectedEvent } from "./AppDisconnectedEvent";
import type { ClientInitializeResponse } from "./ClientInitializeResponse";
import type { ConnectResponse } from "./ConnectResponse";
import type { DropSessionsResponse } from "./DropSessionsResponse";
import type { ErrorMessage } from "./ErrorMessage";
import type { GetInfoResponse } from "./GetInfoResponse";
import type { GetPendingRequestsResponse } from "./GetPendingRequestsResponse";
import type { GetSessionsResponse } from "./GetSessionsResponse";
import type { NewPayloadEvent } from "./NewPayloadEvent";

export type ServerToClient = { type: "ClientInitializeResponse" } & ClientInitializeResponse | { type: "GetInfoResponse" } & GetInfoResponse | { type: "ConnectResponse" } & ConnectResponse | { type: "NewPayloadEvent" } & NewPayloadEvent | { type: "AppDisconnectedEvent" } & AppDisconnectedEvent | { type: "GetPendingRequestsResponse" } & GetPendingRequestsResponse | { type: "DropSessionsResponse" } & DropSessionsResponse | { type: "GetSessionsResponse" } & GetSessionsResponse | { type: "ErrorMessage" } & ErrorMessage | { type: "AckMessage" } & AckMessage;