const superagent = require('superagent');
const async = require('async');

function controlRequest(indexCallback) {
    let ok = 0;
    let page = 1;
    let urls = [];
    let totalCount = 0;//总条数
    let totalPages = 0;//总共多少页
    let pageSize = 20;
    // 利用async控制并发数量
    async.series(
        // series会依次执行队列中的函数
        [
            // 第一次发送请求先拿到总的页码数
            (cb) => {
                superagent
                    .get('https://rong.36kr.com/n/api/column/4/company?sortField=ADD_COLUMN_LABEL&p=1')
                    .send({
                        'p': page
                    })
                    .set(getData.option)
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        
                        let dataObj = JSON.parse(res.text);
                        if (dataObj.code === 0) {
                            totalPages = dataObj.data.pageData.totalPages;
                            totalCount = dataObj.data.pageData.totalCount;
                            companyName = dataObj.data.pageData.data[0].name;
                            companyphase = dataObj.data.pageData.data[0].phase;
                            console.log('companyName=',companyName);
                            if(companyphase === undefined){
                                companyphase = 'un';
                            }
                            console.log('companyphase=',companyphase);
                            console.log('------page-------',totalPages);
                            cb(null, page);
                        } else {
                            console.log('获取数据失败,' + res.text);
                        }

                    });
            },
            // 根据第一次得到的page创建urls数组
            (cb) => {
                for (let i = 1; i <= totalPages; i++) {
                    urls.push(`https://rong.36kr.com/n/api/column/4/company?sortField=ADD_COLUMN_LABEL&p=${i}`)
                    console.log('--------urls----------',urls);
                }
                console.log(`本次共抓取到${totalCount}条数据，${totalPages}页`);
                cb(null, urls);
            },
            // 利用async.mapLimit控制请求，每次最多发送3条请求
            (cb) => {
                async.mapLimit(urls, 3, (url, callback) => {
                    getData.run(url, callback);
                }, (err, result) => {
                    if (err) throw err;
                    if (arguments[2]) {
                        ok = 1;
                    }
                    cb(null, ok)
                });
            },
            () => {
                if (ok) {
                    setTimeout(function () {
                        console.log(`最新获投数据请求完成`);
                        indexCallback(null);
                    }, 5000);
                } else {
                    console.log(`最新获投数据请求完成`);
                }
            }
        ], (err, result) => {
            if (err) throw err;
        });
}

exports.controlRequest = controlRequest;