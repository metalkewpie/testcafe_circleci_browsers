import { Selector, t } from 'testcafe';

export class PageObjectProductsID2{
    //クラスフィールド
    private _cubeNewItemActual : Selector;
    private _cubeNewItemHit : Selector;
    private _countNumberOfHits : number;
    private _countNumberOfCartButton : number;
    private _warningStatement : string;
    //public cubeTastePullDown : Selector;

    constructor(){
        //未定義
    };

    //ヒット件数とカートボタンを取得する
    public async fetchHitsAndCartButton(){
        this._cubeNewItemActual = Selector(".ec-blockBtn--action.add-cart").withText("カートに入れる");
        this._cubeNewItemHit = Selector(".ec-font-bold");

        this._countNumberOfHits = parseInt((await this._cubeNewItemHit.innerText));
        this._countNumberOfCartButton = parseInt(String(await this._cubeNewItemActual.count));
    };

    //カートボタンの数を返すアクセサ
    public get countNumberOfCartButton() : number{
        return this._countNumberOfCartButton ;
    };

    //ヒット件数の数字だけ返すアクセサ
    public get countNumberOfHits() : number{
        return this._countNumberOfHits;
    };


    //プルダウンの中の選択肢を取得する

    private async fetchPullDown(arg : number) : Promise<Selector>{
        let myLocalSelector : Selector = Selector('.ec-shelfRole');
        myLocalSelector = myLocalSelector.find('ul').child(1).find('.ec-productRole__actions').child(arg);//    
        await t.click(myLocalSelector.find('select')); //selectタグを読み込み
        return myLocalSelector.find('option');
    };

    //味プルダウンをクリックして味を選択する。引数はセレクトタグの中の選択肢を指す。数字で指定する。
    public async selectTastePullDown(selectProductInPullDown : number){
        let myLocalSelector : Selector = await this.fetchPullDown(0);
        await t.click(myLocalSelector.sibling(selectProductInPullDown));  //味
        await t.click(Selector('.ec-footerTitle__copyright'));
    };

    //サイズプルダウンをクリックしてサイズを選択する。引数はセレクトタグの中の選択肢を指す。数字で指定する。
    public async selectSizePullDown(selectProductInPullDown : number){
        let myLocalSelector : Selector = await this.fetchPullDown(1);
        await t.click(myLocalSelector.sibling(selectProductInPullDown));  //味
        await t.click(Selector('.ec-footerTitle__copyright'));
    };

    //カートに入れる　ボタンをクリックする。
    public async clickAdd2CartButton(){
        let cartbutton : Selector = Selector('[data-cartid="1"]'); 
        //cartbutton = cartbutton.nth(1);
        await t.click(cartbutton);
        //モーダルウィンドウが表示されるまで待つ
        await t
            //.click(Selector('.ec-font-bold'))
            .expect(await Selector('.ec-modal-wrap').withText("カートへ進む").filterVisible().exists)
            .ok('カートへ進む モーダルの表示待ち')
            .expect(Selector('#ec-modal-header').innerText)
            .contains('カートに追加しました。', '現在値の反映待ち');
        //await this.proceed2Cart();   //「カートへ進む」ボタンをクリックする処理
    };

    //カートへ進むボタンをクリックする。
    public async proceed2Cart(){
        let proceed2cartbutton : Selector = Selector('.ec-inlineBtn--action');
        //proceed2cartbutton = proceed2cartbutton.withText('カートへ進む');
        await t.click(proceed2cartbutton);
    };

};
