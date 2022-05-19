import { Selector, t } from 'testcafe';

export class PageObjectTop{
    //クラスフィールド
    public cubeTopNewItemTab : Selector;

    constructor(){
        //未実装
    };

    public async clickNewItemTab(){
        await this.fetchNewItemTab();           //新入荷タブ取得
        await t.click(this.cubeTopNewItemTab);  //新入荷タブをクリック
        /* 次ページが開くのを待つ */
        await t
            //.click(Selector('.ec-font-bold'))
            .expect(await Selector(".ec-blockBtn--action.add-cart").withText("カートに入れる").filterVisible().exists)
            .ok('新入荷タブの表示待ち')
            .expect(Selector('[data-cartid="2"]').innerText)    //data属性を使用してみた
            .contains('カートに入れる', '現在値の反映待ち');
    };

    private async fetchNewItemTab(){
        let myLocalSelector : Selector;
        myLocalSelector = Selector('.ec-categoryNaviRole').withText("新入荷");
        myLocalSelector = myLocalSelector.find('.ec-itemNav__nav').child(0).child();
        this.cubeTopNewItemTab = myLocalSelector;
    };
};
