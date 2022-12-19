import { encode_vector, encode as encode_varint } from 'varint-vectors'

/* core media-vector */

const flatten_vector = value => {
  if (Array.isArray(value)) {
    return value
  } else {
    // handle optimzed types
    if (value.byteVector) return value.byteVector
    // handle CID and other nested types
    if (value.bytes) return [...value.bytes]
    else return [...value]
  }
}

const encode_media_vector = array => {
  const vectors = array.flatMap(flatten_vector)
  const lengths = vectors.map(vector => vector.length)
  const length = lengths.length
  const encoded = new Uint8Array([
    encode_vector([ length, ...lengths ]),
    vectors,
  ].flatten())
  return encoded
}

const mv = {
  code: 5010,
  encode = encode_media_vector,
  decode = decode_media_vector
}


const markdown = {
  code: 5020,
}


const codecs = [
  mv, markdown
]
codecs.forEach(codec => {
  codec.codeEncoded = varint.encode(codec.code)
})

