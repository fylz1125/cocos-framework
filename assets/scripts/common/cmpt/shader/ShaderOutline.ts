const { ccclass, property, menu, disallowMultiple, executeInEditMode } = cc._decorator;

enum OutlineType {
    NONE = 0,
    /** 外描边 */
    OUT = 1,
    /** 内描边 */
    INNER = 2,
}

@ccclass
@disallowMultiple
@executeInEditMode
@menu('Framework/Shader/ShaderOutline')
export default class ShaderOutline extends cc.Component {
    @property({ tooltip: CC_DEV && '描边颜色' })
    public OutlineColor: cc.Color = new cc.Color();
    @property({ tooltip: CC_DEV && '描边宽度' })
    public OutLineWidth: number = 0;
    @property({ type: cc.Enum(OutlineType), tooltip: CC_DEV && '描边类型' })
    public OutlineType: OutlineType = OutlineType.NONE;
    @property({ tooltip: CC_DEV && '纹理大小' })
    public TextureSize: cc.Size = new cc.Size(1, 1);

    private _mat: cc.Material = null;
    public get mat() {
        if (!this._mat) {
            this._mat = this.getComponent(cc.RenderComponent).getMaterial(0);
        }
        return this._mat;
    }

    protected start() {
        this.updateShader();
    }

    protected update() {
        if (CC_EDITOR) {
            this.updateShader();
        }
    }

    public updateShader() {
        this.mat.setProperty('outlineColor', this.OutlineColor);
        this.mat.setProperty('outlineInfo', new cc.Vec4(this.TextureSize.width, this.TextureSize.height, this.OutLineWidth, this.OutlineType));
    }
}
