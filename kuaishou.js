function waiting(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), n * 1000);
    });
}
function range(min, max) {
    return min + ((max - min) * Math.random() | 0);
}
function dealData(list) {
    const transVol = transVolume();
    const nameSet = new Set();
    const data = ['名称,播放量,播放量2,更新至第n集'];
    list.forEach(row => {
        const [name, playU, episode] = row.trim().split(/\n|\s+/);
        if (!nameSet.has(name)) {
            nameSet.add(name);
            const record = [
                name,
                playU.slice(2),
                transVol(playU),
                episode.replace(/[^\d]/g, ''),
            ];
            data.push(record.join(','));
        }
    });
    return data.join('\n');
}
function transVolume() {
    const reg = /^[^\d]*(?<num>\d+(\.\d+)?)(?<unit>.*)?$/;
    const unitMap = new Map([
        ['千', 1e3],
        ['万', 1e4],
        ['亿', 1e8],
    ]);
    return function (val) {
        if (!reg.test(val)) {
            return '-';
        }
        const { num, unit } = reg.exec(val).groups;
        return (Number(num) * (unitMap.get(unit) || 1)).toFixed(0);
    };
}
function saveData(data) {
    const blob = new Blob([`\ufeff${data}`], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = '快手短剧.csv';
    downloadLink.click();
    window.URL.revokeObjectURL(url);
}
// 精彩追不停
function getDataJc() {
    const list = [];
    const section = document.querySelector('.theater-content > .content > .reco:nth-child(3)');
    const infos = section?.querySelectorAll('.video-info');
    infos?.forEach(el => {
        list.push(el.innerText);
    });
    return list;
}
// 热门榜单
async function getDataRank() {
    const list = [];
    const section = document.querySelector('.theater-content > .content > .rank');
    const btn = section?.querySelector('.area-tab-container');
    (btn?.children.item(0)).click();
    await waiting(1);
    let infos = section?.querySelectorAll('.video-info');
    infos?.forEach(el => {
        list.push(el.innerText);
    });
    (btn?.children.item(1)).click();
    await waiting(1);
    infos = section?.querySelectorAll('.video-info');
    infos?.forEach(el => {
        list.push(el.innerText);
    });
    return list;
}
// 大家都在追
async function getDataZhui(n = 20) {
    const list = [];
    const section = document.querySelector('.theater-content > .content > .reco:nth-child(1)');
    const refreshBtn = section?.querySelector('.video-title .change');
    let i = 0;
    while (i++ < n) {
        const infos = section?.querySelectorAll('.video-info');
        infos?.forEach(el => {
            list.push(el.innerText);
        });
        refreshBtn?.click();
        await waiting(range(3, 6));
    }
    return list;
}
// 短剧
async function getDataDuanjv() {
    const list = [];
    const navbtn = document.querySelector('.navigation-bar-container > .navigation-bar-item:nth-child(2) > .navigation-link');
    navbtn.click();
    await waiting(1);
    const section = document.querySelector('.theater-content .container');
    while (true) {
        const lastCard = section?.querySelector('.video-card:last-child');
        if (!lastCard) {
            for (;;) {
                await waiting(3);
            }
        }
        lastCard.scrollIntoView();
        await waiting(3);
        const newLast = section?.querySelector('.video-card:last-child');
        if (newLast === lastCard) {
            break;
        }
    }
    const infos = section?.querySelectorAll('.video-info');
    infos?.forEach(el => {
        list.push(el.innerText);
    });
    return list;
}
async function main() {
    const list1 = getDataJc();
    console.log(`采集到精彩追不停${list1.length}条`);
    const list2 = await getDataRank();
    console.log(`采集热门榜单${list2.length}条`);
    const list3 = await getDataZhui(20);
    console.log(`采集大家都在追${list3.length}条`);
    const list4 = await getDataDuanjv();
    console.log(`采集短剧${list4.length}条`);
    const list = [
        ...list1,
        ...list2,
        ...list3,
        ...list4,
    ];
    const data = dealData(list);
    saveData(data);
}
main();
