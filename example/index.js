import { FireflyMlsClient } from "./mls_wasm"


const auth = getAuth()
const client = await FireflyMlsClient.new(auth.username, "http://127.0.0.1:39205", () => auth.getToken())
const group = await client.create_group()


await group.sync()
await group.add_member("bob")


await group.update_channel()
await group.save()
