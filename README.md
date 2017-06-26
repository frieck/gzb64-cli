# gzb64

Commandline Tool for encoding and decoding files as gzb64.

[![NPM](https://nodei.co/npm/gzb64-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gzb64-cli.png?downloads=true&downloadRank=true&stars=true)

## Install
`npm install -g gzb64-cli`

## Usage
### Encoding

```bash
gzb64-cli encode some/path/to.file
```

The base64 encoded string will be written to `some/path/to.file.gzb64`.

### Decoding

```bash
gzb64-cli decode some/path/to.file.gzb64
```

The gzb64 decoded string will be written to `some/path/to.file.bin`.
