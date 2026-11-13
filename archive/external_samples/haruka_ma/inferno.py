import json
import os
import io
import hashlib
import base64
import pprint
import functools
import random
import time

from Crypto.Cipher import AES
from Crypto.Cipher.AES import MODE_CBC

rx_key = b"r8hhweybk9ekz62w45qvyjnpz3xguueqg6amhbbghbckpeu8fmzdiivezfbnfxe9puz4thkpx5ejcipp53pcuydpu4yuyxx4rqqu"
tx_key = b"inferno"

customer_id = "milky8753"

# region openssl

# openssl compatibility code from https://gist.github.com/guillaumef/ba08738e5ebdd97de3addd04b3d1ec9a
# slightly modified to fit our needs

OPENSSL_ENC_MAGIC = b'Salted__'
PKCS5_SALT_LEN = 8

factory = lambda key, iv: AES.new(key, MODE_CBC, iv)

def EVP_BytesToKey(key_length: int, iv_length: int, md, salt: bytes, data: bytes, count: int=1) -> (bytes, bytes):
    """
    Usage:
        key, iv = EVP_BytesToKey(
            32,  # 256 bits
            Crypto.Cipher.AES.block_size,
            hashlib.sha256,
            salt,
            password.encode('utf-8'),
            )
    See:
        https://github.com/openssl/openssl/blob/6f0ac0e2f27d9240516edb9a23b7863e7ad02898/crypto/evp/evp_key.c#L74
    """
    assert data
    assert salt == b'' or len(salt) == PKCS5_SALT_LEN

    md_buf = b''
    key = b''
    iv = b''
    # key_length = 32  # type.key_size
    # iv_length = type.block_size

    addmd = 0

    while key_length > len(key) or iv_length > len(iv):
        c = md()
        if addmd:
            c.update(md_buf)
        addmd += 1
        c.update(data)
        c.update(salt)
        md_buf = c.digest()
        for i in range(1, count):
            md_buf = md(md_buf)

        md_buf2 = md_buf

        if key_length > len(key):
            key, md_buf2 = key + md_buf2[:key_length - len(key)], md_buf2[key_length - len(key):]

        if iv_length > len(iv):
            iv = iv + md_buf2[:iv_length - len(iv)]

    return key, iv


def openssl_enc_encrypt(i: io.BytesIO, passphrase: bytes, cipher_factory = factory, key_length = 32, block_size = 16, md=hashlib.md5, salt: bytes=None):
    if salt is None:
        # TODO: Python 3.6's secrets module
        salt = os.urandom(PKCS5_SALT_LEN)

    key, iv = EVP_BytesToKey(key_length, block_size, md, salt, passphrase)

    cipher = cipher_factory(key, iv)

    encrypted = b""
    encrypted += OPENSSL_ENC_MAGIC
    encrypted += salt

    padding = b''
    while 1:
        chunk = i.read(cipher.block_size)

        # PKCS#7 padding method
        if len(chunk) < cipher.block_size:
            remaining = cipher.block_size - len(chunk)
            padding = bytes([remaining] * remaining)

        encrypted += cipher.encrypt(chunk + padding)

        if padding:
            break

    return base64.b64encode(encrypted)

def openssl_enc_decrypt(i: io.BytesIO, passphrase: bytes, cipher_factory = factory, key_length = 32, block_size = 16, md=hashlib.md5):
    assert i.read(len(OPENSSL_ENC_MAGIC)) == OPENSSL_ENC_MAGIC, 'bad magic number'
    salt = i.read(PKCS5_SALT_LEN)

    key, iv = EVP_BytesToKey(key_length, block_size, md, salt, passphrase)

    cipher = cipher_factory(key, iv)

    prefetch = chunk = None
    res = b''
    while 1:
        chunk = prefetch
        prefetch = i.read(cipher.block_size)

        if chunk:
            chunk = cipher.decrypt(chunk)
            if not prefetch:
                chunk = chunk[:-chunk[-1]]
            res += chunk

        if not prefetch:
            break

    return res

# endregion

# ref request payload
#
# {'nftsApi': 2,
# 'site': 'https://scamsite.app/',
# 'tokensApi': 2,
# 'walletAddress': '0x8f36789ac5f1cb9a8e9b8cef6a68e94845acb577',
# 'walletName': 'MetaMask Wallet'}

# ref encrypt function
#
#     function _0x1390b1(input_data) {
#         let timestamp_7 = parseInt(Date.now()["toString"]()["slice"](0, 7));
#         let random1 = Math.round(Math["random"]() * 899999 + 100000);
#         let random2 = Math.round(Math.random() * 899999 + 1000);
#         let rand_str = getRandomString(25); // A-Za-z0-9 * size
#         let rand_str_base64 = encode(rand_str); // base64
#         let rand_str_hash = getHashCode(rand_str); // custom 32bit hash
#         let inner_key = timestamp_7["toString"]() + "inferno" + rand_str_hash + random1;
#         let inner_ct = CryptoJS["AES"]["encrypt"](input_data, inner_key);
#         let outer_ct = CryptoJS["AES"]["encrypt"](inner_ct["toString"](), (random1 + random2 + timestamp_7 - 50)["toString"]());
#         let _0x4f0fbb = JSON["stringify"]({
#             "n1": random1,
#             "n2": random2,
#             "t": timestamp_7,
#             "s": rand_str_base64,
#             "e": outer_ct,
#             "k": getHashCode(inner_key),
#             "i": CryptoJS.AES["encrypt"](global_data["customer_id"], (random1 - random2)["toString"]())["toString"](),
#             "p": random1 + getHashCode(outer_ct) - random2,
#             "z": getHashCode(global_data.customer_id) + timestamp_7
#         });
#         let _0x4ca973 = JSON["stringify"]({
#             "h": encode(getHashCode(_0x4f0fbb)["toString"]()),
#             "c": numbersEncrypt(_0x4f0fbb),
#             "v": 3
#         });
#         return CryptoJS.AES["encrypt"](_0x4ca973, "inferno")["toString"]();
#     }

#     var _0x5e053d = _0x56473f => _0x56473f.split('')["reduce"]((_0x137e7f, _0x1c53a0) => (_0x137e7f = (_0x137e7f << 5) - _0x137e7f + _0x1c53a0.charCodeAt(0), _0x137e7f & _0x137e7f), 0);
#     var _0x1b5799 = _0x262b5a => _0x262b5a["toString"]().split('').map(_0x5c74dd => _0x5c74dd["charCodeAt"](0));
#     var _0x554301 = _0x1b958f => "0" + Number(_0x1b958f)["toString"](16)["substr"](-2); // to hex
#     var _0x3e014c = _0x37cc9b => _0x1b5799(31612400)["reduce"]((_0x1cb226, _0xecb3f) => _0x1cb226 ^ _0xecb3f, _0x37cc9b);
#     var _0x553767 = _0x96536d => JSON["stringify"](_0x96536d).split('')["map"](_0x1b5799).map(_0x3e014c).map(_0x554301).join('');

#     ["getHashCode"]: _0x5e053d,
#     numbersEncrypt: _0x553767,

# bonus spamming payload (/api) - but it seems this backend is down, probably becuase somebody spammed it too much
#
# {"type": "info", "message": "get creative!"}

# oh, don't forget the header:
# content-type: text/plain;charset=UTF-8


def get_hash_code(data: bytes) -> int:
    def reduce_fn(acc: int, c: int) -> int:
        res = (acc << 5) - acc + c
        res = res & 0xffffffff
        if res > 0x7fffffff:
            res -= 0x100000000
        return res
    return functools.reduce(reduce_fn, data, 0)

def numbers_decrypt(data: str) -> str:
    b = bytes.fromhex(data)
    dec = bytes(map(lambda c: functools.reduce(lambda x, y: x ^ y, map(ord, "00421613"), c), b))
    return json.dumps(json.loads(json.loads(dec.decode())), separators=(',', ':'))

def numbers_encrypt(data: str) -> str:
    b = bytes(json.dumps(data, separators=(',', ':')), encoding="utf-8")
    enc = bytes(map(lambda c: functools.reduce(lambda x, y: x ^ y, map(ord, "31612400"), c), b))
    return enc.hex()

def request_decrypt(data: str) -> dict:
    layer_1 = json.loads(openssl_enc_decrypt(io.BytesIO(base64.b64decode(data)), tx_key))
    h, c, v = layer_1["h"], layer_1["c"], layer_1["v"]
    if v != 3:
        raise ValueError("unsupported version")
    layer_1_hash = int(base64.b64decode(h).decode())
    print("layer_1_hash:", layer_1_hash)
    layer_1_data = numbers_decrypt(c)
    if (layer_1_hash_check := get_hash_code(layer_1_data.encode())) != layer_1_hash:
        raise ValueError(f"hash mismatch: {layer_1_hash_check} != {layer_1_hash}")
    layer_2 = json.loads(layer_1_data)
    print("layer_2:", pprint.pformat(layer_2))
    rand_str = base64.urlsafe_b64decode(layer_2["s"]).decode()
    print("rand_str:", rand_str)
    rand_str_hash = get_hash_code(rand_str.encode())
    request_customer_id = openssl_enc_decrypt(io.BytesIO(base64.b64decode(layer_2["i"])), str(layer_2["n1"] - layer_2["n2"]).encode()).decode()
    print("customer_id:", request_customer_id)
    if (customer_id_hash_check := get_hash_code(request_customer_id.encode())) != layer_2["z"] - layer_2["t"]:
        raise ValueError(f"customer_id hash mismatch: {customer_id_hash_check} != {layer_2['z'] - layer_2['t']}")
    inner_key = str(layer_2["t"]) + "inferno" + str(rand_str_hash) + str(layer_2["n1"])
    outer_key = str(layer_2["n1"] + layer_2["n2"] + layer_2["t"] - 50)
    outer_pt = openssl_enc_decrypt(io.BytesIO(base64.b64decode(layer_2["e"])), outer_key.encode())
    inner_pt = openssl_enc_decrypt(io.BytesIO(base64.b64decode(outer_pt)), inner_key.encode())
    return json.loads(inner_pt)

def request_encrypt(data: dict) -> str:
    timestamp_7 = int(str(int(time.time()))[:7])
    random1 = random.randint(100000, 999999)
    random2 = random.randint(1000, 900999)
    rand_str = "".join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", k=25))
    rand_str_base64 = base64.urlsafe_b64encode(rand_str.encode()).decode()
    rand_str_hash = get_hash_code(rand_str.encode())
    inner_key = str(timestamp_7) + "inferno" + str(rand_str_hash) + str(random1)
    inner_ct = openssl_enc_encrypt(io.BytesIO(json.dumps(data, separators=(",", ":")).encode()), inner_key.encode())
    outer_ct = openssl_enc_encrypt(io.BytesIO(inner_ct), str(random1 + random2 + timestamp_7 - 50).encode())
    layer_2 = {
        "n1": random1,
        "n2": random2,
        "t": timestamp_7,
        "s": rand_str_base64,
        "e": outer_ct.decode(),
        "k": get_hash_code(inner_key.encode()),
        "i": openssl_enc_encrypt(io.BytesIO(customer_id.encode()), str(random1 - random2).encode()).decode(),
        "p": random1 + get_hash_code(outer_ct) - random2,
        "z": get_hash_code(customer_id.encode()) + timestamp_7
    }
    pprint.pprint(layer_2)
    layer_2_data = json.dumps(layer_2, separators=(',', ':'))
    layer_2_hash = get_hash_code(layer_2_data.encode())
    layer_1 = {
        "h": base64.b64encode(str(layer_2_hash).encode()).decode(),
        "c": numbers_encrypt(layer_2_data),
        "v": 3
    }
    layer_1_data = json.dumps(layer_1, separators=(',', ':'))
    return openssl_enc_encrypt(io.BytesIO(layer_1_data.encode()), tx_key).decode()

def response_decrypt(data: str) -> dict:
    return json.loads(openssl_enc_decrypt(io.BytesIO(base64.b64decode(data)), rx_key))

def main():
    # do what you want
    pass

if __name__ == '__main__':
    main()
