type GetBitsyUiEnv = (name: string) => string;

const getBitsyUIEnv: GetBitsyUiEnv = (name) => window[`__BitsyUI${name}Environment__`] || {};

export default getBitsyUIEnv;
