class HelperService {
    static encodeHtmlCode(code: string) {
        return code
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&/g, '&amp;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/©/g, '&copy;')
            .replace(/®/g, '&reg;')
            .replace(/€/g, '&euro;')
            .replace(/£/g, '&pound;')
            .replace(/¥/g, '&yen;')
            .replace(/°/g, '&deg;')
    }
}

export default HelperService;