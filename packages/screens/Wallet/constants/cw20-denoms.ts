import { NativeDenom } from "./denoms";

export type CosmWasmChain = "juno" | "secret";

export const Cw20Denoms: Record<CosmWasmChain, Record<string, NativeDenom>> = {
  juno: {
    juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr: {
      coinDenom: "NETA",
      coinMinimalDenom:
        "juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr",
      coinDecimals: 6,
      coinGeckoId: "neta",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/neta.svg",
      chain: "juno",
    },
    juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl: {
      coinDenom: "MARBLE",
      coinMinimalDenom:
        "juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl",
      coinDecimals: 3,
      coinGeckoId: "marble-dao",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/marble.svg",
      chain: "juno",
    },
    juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z: {
      coinDenom: "HOPE",
      coinMinimalDenom:
        "juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z",
      coinDecimals: 6,
      coinGeckoId: "hope-galaxy",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/hope.png",
      chain: "juno",
    },
    juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa: {
      coinDenom: "RAC",
      coinMinimalDenom:
        "juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa",
      coinDecimals: 6,
      coinGeckoId: "racoon",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/rac.svg",
      chain: "juno",
    },
    juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq: {
      coinDenom: "BLOCK",
      coinMinimalDenom:
        "juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq",
      coinDecimals: 6,
      coinGeckoId: "block",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/block.svg",
      chain: "juno",
    },
    juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49: {
      coinDenom: "DHK",
      coinMinimalDenom:
        "juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49",
      coinDecimals: 0,
      coinGeckoId: "dhk",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/dhk.png",
      chain: "juno",
    },
    juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g: {
      coinDenom: "RAW",
      coinMinimalDenom:
        "juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g",
      coinDecimals: 6,
      coinGeckoId: "junoswap-raw-dao",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/raw.png",
      chain: "juno",
    },
    juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w: {
      coinDenom: "ASVT",
      coinMinimalDenom:
        "juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w",
      coinDecimals: 6,
      coinGeckoId: "asvt",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/asvt.png",
      chain: "juno",
    },
    juno1ur4jx0sxchdevahep7fwq28yk4tqsrhshdtylz46yka3uf6kky5qllqp4k: {
      coinDenom: "HNS",
      coinMinimalDenom:
        "juno1ur4jx0sxchdevahep7fwq28yk4tqsrhshdtylz46yka3uf6kky5qllqp4k",
      coinDecimals: 6,
      coinGeckoId: "handshake",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/hns.svg",
      chain: "juno",
    },
    juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3: {
      coinDenom: "JOE",
      coinMinimalDenom:
        "juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3",
      coinDecimals: 6,
      coinGeckoId: "joe",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/joe.png",
      chain: "juno",
    },
    juno1sfwye65qxcfsc837gu5qcprcz7w49gkv3wnat04764ld76hy3arqs779tr: {
      coinDenom: "DLA",
      coinMinimalDenom:
        "juno1sfwye65qxcfsc837gu5qcprcz7w49gkv3wnat04764ld76hy3arqs779tr",
      coinDecimals: 6,
      coinGeckoId: "dla",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/dla.png",
      chain: "juno",
    },
    juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se: {
      coinDenom: "GLTO",
      coinMinimalDenom:
        "juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se",
      coinDecimals: 6,
      coinGeckoId: "glto",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/glto.svg",
      chain: "juno",
    },
    juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh: {
      coinDenom: "GKEY",
      coinMinimalDenom:
        "juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh",
      coinDecimals: 6,
      coinGeckoId: "gkey",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/gkey.svg",
      chain: "juno",
    },
    juno1t46z6hg8vvsena7sue0vg6w85ljar3cundplkre9sz0skeqkap9sxyyy6m: {
      coinDenom: "HOLE",
      coinMinimalDenom:
        "juno1t46z6hg8vvsena7sue0vg6w85ljar3cundplkre9sz0skeqkap9sxyyy6m",
      coinDecimals: 6,
      coinGeckoId: "hole",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/hole.png",
      chain: "juno",
    },
    juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv: {
      coinDenom: "SEJUNO",
      coinMinimalDenom:
        "juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv",
      coinDecimals: 6,
      coinGeckoId: "stakeeasy-juno-derivative",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/sejuno.svg",
      chain: "juno",
    },
    juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3: {
      coinDenom: "BJUNO",
      coinMinimalDenom:
        "juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3",
      coinDecimals: 6,
      coinGeckoId: "stakeeasy-bjuno",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/bjuno.svg",
      chain: "juno",
    },
    juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse: {
      coinDenom: "SOLAR",
      coinMinimalDenom:
        "juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse",
      coinDecimals: 6,
      coinGeckoId: "solar",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/solar.png",
      chain: "juno",
    },
    juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf: {
      coinDenom: "SEASY",
      coinMinimalDenom:
        "juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf",
      coinDecimals: 6,
      coinGeckoId: "seasy",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/seasy.svg",
      chain: "juno",
    },
    juno1p8x807f6h222ur0vssqy3qk6mcpa40gw2pchquz5atl935t7kvyq894ne3: {
      coinDenom: "MUSE",
      coinMinimalDenom:
        "juno1p8x807f6h222ur0vssqy3qk6mcpa40gw2pchquz5atl935t7kvyq894ne3",
      coinDecimals: 6,
      coinGeckoId: "muse",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/muse.png",
      chain: "juno",
    },
    juno1qsrercqegvs4ye0yqg93knv73ye5dc3prqwd6jcdcuj8ggp6w0us66deup: {
      coinDenom: "LOOP",
      coinMinimalDenom:
        "juno1qsrercqegvs4ye0yqg93knv73ye5dc3prqwd6jcdcuj8ggp6w0us66deup",
      coinDecimals: 6,
      coinGeckoId: "loop",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/loop.png",
      chain: "juno",
    },
    juno1cltgm8v842gu54srmejewghnd6uqa26lzkpa635wzra9m9xuudkqa2gtcz: {
      coinDenom: "FURY",
      coinMinimalDenom:
        "juno1cltgm8v842gu54srmejewghnd6uqa26lzkpa635wzra9m9xuudkqa2gtcz",
      coinDecimals: 6,
      coinGeckoId: "fanfury",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/fanfury.png",
      chain: "juno",
    },
    juno1rws84uz7969aaa7pej303udhlkt3j9ca0l3egpcae98jwak9quzq8szn2l: {
      coinDenom: "PHMN",
      coinMinimalDenom:
        "juno1rws84uz7969aaa7pej303udhlkt3j9ca0l3egpcae98jwak9quzq8szn2l",
      coinDecimals: 6,
      coinGeckoId: "posthuman",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/phmn.svg",
      chain: "juno",
    },
    juno1u45shlp0q4gcckvsj06ss4xuvsu0z24a0d0vr9ce6r24pht4e5xq7q995n: {
      coinDenom: "HOPERS",
      coinMinimalDenom:
        "juno1u45shlp0q4gcckvsj06ss4xuvsu0z24a0d0vr9ce6r24pht4e5xq7q995n",
      coinDecimals: 6,
      coinGeckoId: "hopers",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/hopers.png",
      chain: "juno",
    },
    juno1g647t78y2ulqlm3lss8rs3d0spzd0teuwhdvnqn92tr79yltk9dq2h24za: {
      coinDenom: "RED",
      coinMinimalDenom:
        "juno1g647t78y2ulqlm3lss8rs3d0spzd0teuwhdvnqn92tr79yltk9dq2h24za",
      coinDecimals: 6,
      coinGeckoId: "red",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/red.png",
      chain: "juno",
    },
    juno14q8kk464fafql2fwmlsgvgcdl6h2csqpzv4hr025fmcvgjahpess32k0j7: {
      coinDenom: "BLUE",
      coinMinimalDenom:
        "juno14q8kk464fafql2fwmlsgvgcdl6h2csqpzv4hr025fmcvgjahpess32k0j7",
      coinDecimals: 6,
      coinGeckoId: "blue",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/blue.png",
      chain: "juno",
    },
    juno1mkw83sv6c7sjdvsaplrzc8yaes9l42p4mhy0ssuxjnyzl87c9eps7ce3m9: {
      coinDenom: "WYND",
      coinMinimalDenom:
        "juno1mkw83sv6c7sjdvsaplrzc8yaes9l42p4mhy0ssuxjnyzl87c9eps7ce3m9",
      coinDecimals: 6,
      coinGeckoId: "wynd",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/wynd.svg",
      chain: "juno",
    },
    juno1s2dp05rspeuzzpzyzdchk262szehrtfpz847uvf98cnwh53ulx4qg20qwj: {
      coinDenom: "BANANA",
      coinMinimalDenom:
        "juno1s2dp05rspeuzzpzyzdchk262szehrtfpz847uvf98cnwh53ulx4qg20qwj",
      coinDecimals: 6,
      coinGeckoId: "banana",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/banana.png",
      chain: "juno",
    },
    juno1qmlchtmjpvu0cr7u0tad2pq8838h6farrrjzp39eqa9xswg7teussrswlq: {
      coinDenom: "NRIDE",
      coinMinimalDenom:
        "juno1qmlchtmjpvu0cr7u0tad2pq8838h6farrrjzp39eqa9xswg7teussrswlq",
      coinDecimals: 6,
      coinGeckoId: "nride",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/nride.svg",
      chain: "juno",
    },
  },
  secret: {
    secret1rgm2m5t530tdzyd99775n6vzumxa5luxcllml4: {
      coinDenom: "SIENNA",
      coinMinimalDenom: "secret1rgm2m5t530tdzyd99775n6vzumxa5luxcllml4",
      coinDecimals: 18,
      coinGeckoId: "sienna",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/sienna.svg",
      chain: "secret",
    },
    secret1qfql357amn448duf5gvp9gr48sxx9tsnhupu3d: {
      coinDenom: "SHD",
      coinMinimalDenom: "secret1qfql357amn448duf5gvp9gr48sxx9tsnhupu3d",
      coinDecimals: 8,
      coinGeckoId: "shade-protocol",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/shd.svg",
      chain: "secret",
    },
    secret1k6u0cy4feepm6pehnz804zmwakuwdapm69tuc4: {
      coinDenom: "stkd-SCRT",
      coinMinimalDenom: "secret1k6u0cy4feepm6pehnz804zmwakuwdapm69tuc4",
      coinDecimals: 6,
      coinGeckoId: "stkd-scrt",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/stkd-scrt.svg",
      chain: "secret",
    },
    secret1yxcexylwyxlq58umhgsjgstgcg2a0ytfy4d9lt: {
      coinDenom: "BUTT",
      coinMinimalDenom: "secret1yxcexylwyxlq58umhgsjgstgcg2a0ytfy4d9lt",
      coinDecimals: 6,
      coinGeckoId: "button",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/butt.svg",
      chain: "secret",
    },
    secret12rcvz0umvk875kd6a803txhtlu7y0pnd73kcej: {
      coinDenom: "ALTER",
      coinMinimalDenom: "secret12rcvz0umvk875kd6a803txhtlu7y0pnd73kcej",
      coinDecimals: 6,
      coinGeckoId: "alter",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/alter.svg",
      chain: "secret",
    },
    secret1s09x2xvfd2lp2skgzm29w2xtena7s8fq98v852: {
      coinDenom: "AMBER",
      coinMinimalDenom: "secret1s09x2xvfd2lp2skgzm29w2xtena7s8fq98v852",
      coinDecimals: 6,
      coinGeckoId: "amber",
      icon: "https://assets.leapwallet.io/cosmos/cw20/images/amber.svg",
      chain: "secret",
    },
  },
};
