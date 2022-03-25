class Colour {
    static generateRGB(r, g, b){
        return "rgb(" + r + ", " + g + ", " + b + ")";
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