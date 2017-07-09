const superagent = require('superagent');
const fs = require('fs');
let num = 0;

// let options = {
//     'Host': 'www.lagou.com',
//     'Connection': 'keep-alive',
//     'Upgrade-Insecure-Requests': 1,
//     'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
//     'Content-Type': 'application/json;charset=utf-8',
//     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//     'Accept-Encoding': 'gzip, deflate,sdch, br',
//     'Accept-Language': 'zh-CN,zh;q=0.8',
//     'Cookie':'user_trace_token=20170703095519-c42d6f8d-5b31-4123-be92-e5ad542862ab; LGUID=20170703095521-abf6bc6d-5f92-11e7-a18b-5254005c3644; X_HTTP_TOKEN=4c1141b9d40b34e67fd2baae94b1d7d4; TG-TRACK-CODE=search_banner; index_location_city=%E6%9D%AD%E5%B7%9E; JSESSIONID=ABAAABAACBHABBIEEFD3466BB646F4791E8B083BC28FA4D; SEARCH_ID=3b1d25acaf854ff98e4fd48f1dc0db3b; _gat=1; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1499046918,1499047052; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1499067629; _ga=GA1.2.62398838.1499046918; _gid=GA1.2.1501292352.1499046918; LGSID=20170703154032-e4b97a7b-5fc2-11e7-8187-525400f775ce; PRE_UTM=; PRE_HOST=; PRE_SITE=https%3A%2F%2Fwww.lagou.com%2Fjobs%2Flist_%25E5%2589%258D%25E7%25AB%25AF%3Fcity%3D%25E6%259D%25AD%25E5%25B7%259E%26cl%3Dfalse%26fromSearch%3Dtrue%26labelWords%3D%26suginput%3D; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Fjobs%2Flist_java%3Fcity%3D%25E6%259D%25AD%25E5%25B7%259E%26cl%3Dfalse%26fromSearch%3Dtrue%26labelWords%3D%26suginput%3D; LGRID=20170703154032-e4b97c0a-5fc2-11e7-8187-525400f775ce'
//     //'Referer':'https://www.lagou.com/jobs/list_前端?city=%E6%9D%AD%E5%B7%9E'
//     //'Cookie': 'user_trace_token=20170603162959-264ab0a065f644f790dd1748786fcf27; LGUID=20170603162959-d4c059b6-4836-11e7-9737-5254005c3644; JSESSIONID=ABAAABAACDBABJB3E7AC7AB5E78E15B61593E7824A580AF; PRE_UTM=; PRE_HOST=www.google.com; PRE_SITE=https%3A%2F%2Fwww.google.com%2F; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2F; ab_test_random_num=0; _gat=1; _putrc=537084309D9B2D17; login=true; unick=%E5%BC%A0%E4%B8%96%E5%BC%BA; showExpriedIndex=1; showExpriedCompanyHome=1; showExpriedMyPublish=1; hasDeliver=16; TG-TRACK-CODE=index_navigation; LGSID=20170604121804-cde500a7-48dc-11e7-9798-5254005c3644; LGRID=20170604122351-9d14df1f-48dd-11e7-9798-5254005c3644; _ga=GA1.2.1556911984.1496478599; _gid=GA1.2.1805336829.1496478599; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1496549884,1496549975,1496550053,1496550198; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1496550232; SEARCH_ID=c4c755ab1d4446479ba4bad9672560a8; index_location_city=%E5%85%A8%E5%9B%BD'
//     // 'Cookie': 'JSESSIONID=ABAAABAACDBABJBEABDFFAA3157B710FDF8BFBE5A7564D3'
// };

let options = {
    'Host': 'rong.36kr.com',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate,br',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cookie':'kr_stat_uuid=xZbTF24984668; _kr_p_se=0cb8ccb2-07f4-4bd0-bc34-4ad7a2b50670; Hm_lvt_e8ec47088ed7458ec32cde3617b23ee3=1499080500; krid_user_id=779679655; krid_user_version=4; kr_plus_id=779679655; kr_plus_token=aAslWS_o_PUgVrpzs9XJa1d4lIJFqU_9425611__; aliyungf_tc=AQAAALLi1WYgswQAoW1o3z9OL2/NelYa; kr_plus_utype=0; Z-XSRF-TOKEN=eyJpdiI6ImtGenRoZm1kTkpUdThUU0MyWHlQR3c9PSIsInZhbHVlIjoidndrUUxObFZzWVZvekxVQjM1NUlmd1VSK08weVwvRHp4Y0JVdVEyc1M3MWxpT2xBajJZR3BCS0pWUVZJUGVlajNNdHNtWlwvYlRiWk00V0pxaU53aDV0Zz09IiwibWFjIjoiMWYxNTk2MzVjY2RkZDIxYWUxMGJhNzJhYzkxN2QwNjEwMzNhYjAzNDhkNWZlZmQzNDk5MTYzOTBmNGUxZTYyZSJ9; krchoasss=eyJpdiI6Im9IMnpWRmg0WUNVb1NGQ1RJcUZsTEE9PSIsInZhbHVlIjoiN1QyUndVQ1gyaTh6d1VkajRLMDA0Tm1KSDN2dlBlS09Sa2ZtU0tZemZ2Sm1lWloyZlFTZUh3c0JZQ3JpeHBNc3IzUTRkNnRwSGpkM0ZSU2JWWjFxaFE9PSIsIm1hYyI6IjAyOTY1MjFlYWYyYjQwYTM2OWQ4MGVlOTkwOTljMTkzYmY5ZTczYzI5YWE5OWRkNzE0YmNjMDI5OTAzNGY3YWYifQ%3D%3D',
    'X-Tingyun-Id':'Dio1ZtdC5G4;r=13560954'
    //'Referer':'https://www.lagou.com/jobs/list_前端?city=%E6%9D%AD%E5%B7%9E'
};

function getData(url, callback) {
    let info = url.split('&');
    //let city = info[1].split('=')[1];
    //let position = info[2].split('=')[1];
    let page = info[1].split('=')[1];
    num++;
    superagent
        // post请求
        .get(url)
        .send({
            // 'pn': page,
            // 'kd': position,
            // 'first': true
            
            'p': page
        })
        .set(options)
        // 请求成功处理接收数据
        .end((err, res) => {
            if (err) throw err;
            console.log(`正在抓取第${page}页，当前并发数量：${num}`);
            // 判断是否存在data文件夹，如不存在则创建data文件夹
            if (!fs.existsSync('./data')) {
                fs.mkdirSync('./data');
            }
            // 将数据以.json格式储存在data文件夹下
            fs.writeFile(`./data/20170705_${page}.json`, res.text, (err) => {
                if (err) throw err;
                // 写入数据完成后，两秒后再发送下一次请求
                setTimeout(() => {
                    num--;
                    console.log(`第${page}页写入成功`);
                    callback(null, 'success');
                }, 2000);
            });
        });
};

exports.run = getData;
exports.option = options;