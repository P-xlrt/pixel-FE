const convertToHex = (int) => {
    return parseInt(int).toString(16);
}
const convertToInt = (hex) => {
    return parseInt(hex, 16);
}

class Colour {
    static generateRGB(r, g, b){
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
    static generateFromHex(hex, alpha = 1){
        if(hex.length !== 6) return null;
        return new Colour(convertToInt(hex.substring(0, 2)), convertToInt(hex.substring(2, 4)), convertToInt(hex.substring(4, 6)), alpha);
    }
    constructor(r, g, b, a){
        this._rgb = Colour.generateRGB(r, g, b);
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }
    get rgb(){
        return this._rgb;
    }
    get hex(){
        const hexR = convertToHex(this.r);
        const hexG = convertToHex(this.g);
        const hexB = convertToHex(this.b);
        return ((hexR.length == 1 ? "0" : "") + hexR + (hexG.length == 1 ? "0" : "") + hexG + (hexB.length == 1 ? "0" : "") + hexB).toUpperCase();
    }
    get r(){
        return this._r;
    }
    get g(){
        return this._g;
    }
    get b(){
        return this._b;
    }
    get a(){
        return this._a;
    }
}


export default Colour;