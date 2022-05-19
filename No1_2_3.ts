import { Selector, t } from 'testcafe';
import { PageObjectTop } from './pages/top'
import { PageObjectProductsID2 } from './pages/products'
import { PageObjectCart } from './pages/cart'
//const simplegit = require('simple-git'); 
//import gc from './gitconnect/connecting_git';
const unitpricelist = require('./datadriven/unitpricelist.json');
//import unitpricelist from './datadriven/unitpricelist.json';
const dayjs = require('dayjs');



const pot = new PageObjectTop();            //トップページ
const popi2 = new PageObjectProductsID2();  //新入荷ページ
const carts = new PageObjectCart();         //カートページ

fixture("CUBE New Item")
    .page("http://blogoethe.net/test-automation/");


//no001	新入荷タブの「〇件の商品が見つかりました」の個数と、実際に表示されている商品の個数が同じであることを確認。
test("No001 : Count new products", async (t) => {

    await pot.clickNewItemTab();                //クリックして遷移
    await popi2.fetchHitsAndCartButton();       //カートに入れるボタンの数とヒット件数を取得

    await t.expect(popi2.countNumberOfCartButton == popi2.countNumberOfHits).ok("ヒット数と表示件数が異なります。");
    //await gc.addcommitpush('test_cube.ts');
});

//No002の処理
async function execTestNo002(aji : number , ookisa : number ,amount : string){
    await pot.clickNewItemTab();                //クリックして遷移
    await popi2.selectTastePullDown(aji); //味を指定。０はチョコ
    await popi2.selectSizePullDown(ookisa); //大きさを指定。０は16*16
    await popi2.clickAdd2CartButton();  //カートに追加
    await popi2.proceed2Cart();             //カートページへ遷移
    await t.expect(await carts.comparingTotalAmount(amount)).ok("期待値と異なります。");
    await t.setNativeDialogHandler((type, text) => {            //ダイアログの操作
        if (text == 'カートから商品を削除してもよろしいですか?'){
            return true;
        }
    });
    await carts.deleteItem();
};

//No002	CUBEの味と大きさについて、複数のパターンで右上のカート金額と個数が正しく計算されることを確認。
for (const upl of unitpricelist){
    test("No002 : Compare TotalAmount", async (t) => {
        await execTestNo002(upl.taste,upl.size,upl.kakaku);
    });
};


//No003	CUBEの味と大きさについて、複数のパターンで右上のカート金額と個数が正しく計算されることを確認。
test("No003 : Check warning", async (t) => {
    await pot.clickNewItemTab();                //クリックして遷移
    await popi2.selectTastePullDown(0); //味を指定。０はチョコ
    const addcartbutton : Selector = Selector('[data-cartid="1"]');
    await t.setNativeDialogHandler((type, text, url) => {});
    await t.click(addcartbutton);
    const history = await t.getNativeDialogHistory();
    await t.expect(history[0].text == 'カートへの追加に失敗しました。').ok('注意文は正しく表示表示されていますか？');
});








