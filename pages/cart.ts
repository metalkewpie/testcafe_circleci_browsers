import { Selector, t } from 'testcafe';

//カート内ページ
export class PageObjectCart{

    //クラスフィールド
    private _totalAmount : string;

    constructor(){        
    };

    //カートページ内の合計金額を取得する
    public async comparingTotalAmount(arg : string) : Promise<boolean>{
        this._totalAmount = String(await Selector('.ec-cartRole__totalAmount').innerText);
        if (this._totalAmount == arg){
            return true
        }else {
            return false
        }
    };

    //バッテンの削除ボタンをクリック
    public async deleteItem(){
        let item : Selector = Selector('.ec-cartTable');
        item = item.find('ul').nth(0);
        item = item.find('li').nth(0);
        await t.click(item);
    };

    //合計金額を返すアクセサ
    public get totalAmount() : string{
        return (function () : string{
            return this._totalAmount;
        }());
    };

    //お買い物を続ける　ボタンをクリックして買い物ページに戻る
    public async clickContinueShopping(){
        await t.click(Selector('a').withText("お買い物を続ける"));
    };


}