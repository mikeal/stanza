import {
  encode_vector,
  parse_vector,
  parse as parse_varint,
  encode as encode_varint
} from 'varint-vectors'

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
const decode_media_vector = array => {
  if (!Array.isArray(array)) array = [...array]
  let [ length, offset ] = parse_varint(array)
  let vector = parse_vector(array, length, offset)
  offset = vector.pop()
  let i = 0
  const values = []
  while (i < length) {
    const size = vector[i]
    values.push(array.slice(offest, offset + size))
    offset += size
    i++
  }
  return values
}

const mv = {
  code: 5010,
  encode: encode_media_vector,
  decode: decode_media_vector
}

const utf8 = str => new TextEncoder().encode(str)

const markdown = {
  code: 5020,
  encode: string => {
    return new Uint8Array([ ...varint_encode(markdown.code), ...utf8(string) ])
  },
  decode: bytes => {
    if (bytes[0] !== markdown.codeEncoded[0] ||
        bytes[1] !== markdown.codeEncoded[1]
    ) {
      throw new Error('Encode error: not markdown encoded multiformat binary')
    }
    if (!bytes.subarray) {
      bytes = new Uint8Array(bytes.slice(markdown.codeEncoded.length))
    } else {
      bytes = bytes.subarray(markdown.codeEncoded.length)
    }
    return new TextDecoder().decode(bytes)
  }
}


const codecs = [
  mv, markdown
]
codecs.forEach(codec => {
  codec.codeEncoded = encode_varint(codec.code)
})

export { mv, markdown, codecs }
