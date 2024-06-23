
function collectData(max = 1000) {
    const list: string[] = []
    const ul = document.querySelector('#douyin-right-container > div:nth-child(2) >  div:nth-child(2) > ul')
    const lis = ul!.children
    let start = 0
    let end = 0

    const getData = () => {
        for (let i = start; i < end; i++) {
            list.push((lis.item(i) as HTMLElement).innerText)
        }
        let lastItem = lis.item(end - 1) as HTMLElement
        lastItem.scrollIntoView()
    }

    let gen = setInterval(() => {
        start = end
        end = lis.length
        if (end > start && list.length <= max) {
            getData()
        } else {
            clearInterval(gen)
            saveData(dealData(list))
        }
    }, 1000 * 5)
}

function dealData(list: string[]) {
    const transVol = transVolume()
    const nameSet = new Set<string>()
    const data = ['名称,题材,集数,播放量,播放量2,备注']
    list.forEach(row => {
        const cells = row.split(/\n|·/)
        if (cells.length === 4) {
            cells.splice(1, 0, '')
        }
        const [playU, remark, name, classify, episode] = cells
        if (!nameSet.has(name)) {
            nameSet.add(name)
            const record = [
                name,
                classify,
                episode,
                playU,
                transVol(playU),
                remark,
            ]
            data.push(record.join(','))
        }
    })
    return data.join('\n')
}

function transVolume() {
    const reg = /^(?<num>\d+(\.\d+)?)(?<unit>.*)?$/
    const unitMap = new Map([
        ['千', 1e3],
        ['万', 1e4],
        ['亿', 1e8],
    ])
    return function(val: string) {
        if (!reg.test(val)) {
            return val
        }
        const { num, unit } = reg.exec(val)!.groups!
        return (Number(num) * (unitMap.get(unit) || 1)).toFixed(0)
    }
}

function saveData(data: string) {
    const blob = new Blob([`\ufeff${data}`], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = '抖音短剧.csv'
    downloadLink.click()
    window.URL.revokeObjectURL(url)
}

collectData()
