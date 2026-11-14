# Inferno Backend Decryption — Notes

`decrypt.py` is a traffic decryption tool for the Inferno backend protocol.
It was developed through manual deobfuscation of the Inferno JS bundle
(reference: [muellerberndt's public gist](https://gist.github.com/HarukaMa/776be3dc44a687e15145030c14fe714e)).

The tool reconstructs the plaintext of Inferno backend requests and allows
crafting arbitrary payloads for the backend server. Finding the backend domain
requires tracing the bundle's config or observing live traffic.

All code in `decrypt.py` is released to the public domain by its original author.

## Relationship to hexfomo kit

The hexfomo kit uses a different encryption scheme:

| Property | Inferno | hexfomo |
|---|---|---|
| Encryption | (see decrypt.py) | AES-GCM |
| Key derivation | (see bundle) | `SHA-256(apiHost + purpose + "B3ui3QZFrOPoGW7oMZgE4A")` |
| Config endpoint | `/api/config` | `/api/config` (same pattern) |
| Event endpoint | varies | `/api/handler` |

For the hexfomo key derivation and payload layouts, see `data/core/`.
