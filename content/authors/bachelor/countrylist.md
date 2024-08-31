---
title: 国家与国旗的对应字典
author: Bachelor
date: 2022-09-23
authorLink: "/authors/bachelor"
featuredImagePreview: "/agency/un.svg"
TocOpen: ture
tags:
- documents
multitype: 
- documents
---

世界上有接近两百多个国家和地区，给他们分别建立数据库是非常必要的，我们首先从他们的中英文译名和国旗开始建立index。

<!--more-->

## 关于国家列表，我们检索一下互联网，发现已经存在两种数据集可供我们参考和使用

国名中英名称 https://juejin.cn/post/6844904134387187720
从这个开源包中我们可以获得国家中英文的映射关系。

国旗png https://flagpedia.asia/data/flags-ultra.zip

## 第一步是先搞出字典。

先对列表做一些技术型处理

```markdown
# string = str(countries)
# string = string.replace(': ', ': [')
# string = string.replace(',', ', \'.png\'],\n')
# print(string)

```

## 第二步我们通过伟大的人工（游戏）对应国旗和国名，填入对应国旗的png名称。。。

```markdown
countries = {
 'Andorra': ['安道尔', 'ad.png'],
 'Singapore Rep.': ['新加坡', 'sg.png'],
 'Dominican Rep.': ['多米尼加', 'do.png'],
 'Palestine': ['巴勒斯坦', 'ps.png'],
 'Bahamas': ['巴哈马', 'bs.png'],
 'Timor-Leste': ['东帝汶', 'tl.png'],
 'Afghanistan': ['阿富汗', 'af.png'],
 'Guinea-Bissau': ['几内亚比绍', 'gw.png'],
 "Cote d'Ivoire": ['科特迪瓦', 'ci.png'],
 'Siachen Glacier': ['锡亚琴冰川', '.png'],
 'Br. Indian Ocean Ter.': ['英属印度洋领土', 'bio.png'],
 'Angola': ['安哥拉', 'ao.png'],
 'Albania': ['阿尔巴尼亚', 'al.png'],
 'United Arab Emirates': ['阿联酋', 'ae.png'],
 'Argentina': ['阿根廷', 'ar.png'],
 'Armenia': ['亚美尼亚', 'am.png'],
 'French Southern and Antarctic Lands': ['法属南半球和南极领地', 'fs.png'],
 'Australia': ['澳大利亚', 'au.png'],
 'Austria': ['奥地利', 'at.png'],
 'Azerbaijan': ['阿塞拜疆', 'az.png'],
 'Burundi': ['布隆迪', 'bi.png'],
 'Belgium': ['比利时', 'be.png'],
 'Benin': ['贝宁', 'bj.png'],
 'Burkina Faso': ['布基纳法索', 'bf.png'],
 'Bangladesh': ['孟加拉国', 'bd.png'],
 'Bulgaria': ['保加利亚', 'bg.png'],
 'The Bahamas': ['巴哈马', 'bs.png'],
 'Bosnia and Herz.': ['波斯尼亚和黑塞哥维那', 'ba.png'],
 'Belarus': ['白俄罗斯', 'by.png'],
 'Belize': ['伯利兹', 'bz.png'],
 'Bermuda': ['百慕大', 'bm.png'],
 'Bolivia': ['玻利维亚', 'bo.png'],
 'Brazil': ['巴西', 'br.png'],
 'Brunei': ['文莱', 'bn.png'],
 'Bhutan': ['不丹', 'bt.png'],
 'Botswana': ['博茨瓦纳', 'bw.png'],
 'Central African Rep.': ['中非', 'cf.png'],
 'Canada': ['加拿大', 'ca.png'],
 'Switzerland': ['瑞士', 'ch.png'],
 'Chile': ['智利', 'cl.png'],
 'China': ['中国', 'cn.png'],
 'Ivory Coast': ['象牙海岸', 'ci.png'],
 'Cameroon': ['喀麦隆', 'cm.png'],
 'Dem. Rep. Congo': ['刚果民主共和国', 'cd.png'],
 'Congo': ['刚果', 'cg.png'],
 'Colombia': ['哥伦比亚', 'co.png'],
 'Costa Rica': ['哥斯达黎加', 'cr.png'],
 'Cuba': ['古巴', 'cu.png'],
 'N. Cyprus': ['北塞浦路斯', '.png'],
 'Cyprus': ['塞浦路斯', 'cy.png'],
 'Czech Rep.': ['捷克', 'cz.png'],
 'Germany': ['德国', 'de.png'],
 'Djibouti': ['吉布提', 'dj.png'],
 'Denmark': ['丹麦', 'dk.png'],
 'Algeria': ['阿尔及利亚', 'dz.png'],
 'Ecuador': ['厄瓜多尔', 'ec.png'],
 'Egypt': ['埃及', 'eg.png'],
 'Eritrea': ['厄立特里亚', 'er.png'],
 'Spain': ['西班牙', 'es.png'],
 'Estonia': ['爱沙尼亚', 'ee.png'],
 'Ethiopia': ['埃塞俄比亚', 'et.png'],
 'Finland': ['芬兰', 'fi.png'],
 'Fiji': ['斐济', 'fj.png'],
 'Falkland Islands': ['福克兰群岛', 'fk.png'],
 'France': ['法国', 'fr.png'],
 'Gabon': ['加蓬', 'ga.png'],
 'United Kingdom': ['英国', 'gb.png'],
 'Georgia': ['格鲁吉亚', 'ge.png'],
 'Ghana': ['加纳', 'gh.png'],
 'Guinea': ['几内亚', 'gn.png'],
 'Gambia': ['冈比亚', 'gm.png'],
 'Guinea Bissau': ['几内亚比绍', 'gw.png'],
 'Eq. Guinea': ['赤道几内亚', 'gq.png'],
 'Greece': ['希腊', 'gr.png'],
 'Greenland': ['格陵兰', 'gl.png'],
 'Guatemala': ['危地马拉', 'gt.png'],
 'French Guiana': ['法属圭亚那', 'gf.png'],
 'Guyana': ['圭亚那', 'gy.png'],
 'Honduras': ['洪都拉斯', 'hn.png'],
 'Croatia': ['克罗地亚', 'hr.png'],
 'Haiti': ['海地', 'ht.png'],
 'Hungary': ['匈牙利', 'hu.png'],
 'Indonesia': ['印度尼西亚', 'id.png'],
 'India': ['印度', 'in.png'],
 'Ireland': ['爱尔兰', 'ie.png'],
 'Iran': ['伊朗', 'ir.png'],
 'Iraq': ['伊拉克', 'iq.png'],
 'Iceland': ['冰岛', 'is.png'],
 'Israel': ['以色列', 'il.png'],
 'Italy': ['意大利', 'it.png'],
 'Jamaica': ['牙买加', 'jm.png'],
 'Jordan': ['约旦', 'jo.png'],
 'Japan': ['日本', 'jp.png'],
 'Kazakhstan': ['哈萨克斯坦', 'kz.png'],
 'Kenya': ['肯尼亚', 'ke.png'],
 'Kyrgyzstan': ['吉尔吉斯斯坦', 'kg.png'],
 'Cambodia': ['柬埔寨', 'kh.png'],
 'Korea': ['韩国', 'kr.png'],
 'Kosovo': ['科索沃', 'xk.png'],
 'Kuwait': ['科威特', 'kw.png'],
 'Lao PDR': ['老挝', 'la.png'],
 'Lebanon': ['黎巴嫩', 'lb.png'],
 'Liechtenstein': ['列支敦士登', 'li.png'],
 'Liberia': ['利比里亚', 'lr.png'],
 'Libya': ['利比亚', 'ly.png'],
 'Sri Lanka': ['斯里兰卡', 'lk.png'],
 'Lesotho': ['莱索托', 'ls.png'],
 'Lithuania': ['立陶宛', 'lt.png'],
 'Luxembourg': ['卢森堡', 'lu.png'],
 'Latvia': ['拉脱维亚', 'lv.png'],
 'Morocco': ['摩洛哥', 'ma.png'],
 'Moldova': ['摩尔多瓦', 'md.png'],
 'Madagascar': ['马达加斯加', 'mg.png'],
 'Mexico': ['墨西哥', 'mx.png'],
 'Macedonia': ['北马其顿', 'mk.png'],
 'Mali': ['马里', 'ml.png'],
 'Myanmar': ['缅甸', 'mm.png'],
 'Montenegro': ['黑山', 'me.png'],
 'Mongolia': ['蒙古', 'mn.png'],
 'Mozambique': ['莫桑比克', 'mz.png'],
 'Mauritania': ['毛里塔尼亚', 'mr.png'],
 'Malawi': ['马拉维', 'mv.png'],
 'Malaysia': ['马来西亚', 'mr.png'],
 'Namibia': ['纳米比亚', 'na.png'],
 'New Caledonia': ['新喀里多尼亚', 'nc.png'],
 'Niger': ['尼日尔', 'ne.png'],
 'Nigeria': ['尼日利亚', 'ng.png'],
 'Nicaragua': ['尼加拉瓜', 'ni.png'],
 'Netherlands': ['荷兰', 'nl.png'],
 'Norway': ['挪威', 'no.png'],
 'Nepal': ['尼泊尔', 'np.png'],
 'New Zealand': ['新西兰', 'nz.png'],
 'Oman': ['阿曼', 'om.png'],
 'Pakistan': ['巴基斯坦', 'pk.png'],
 'Panama': ['巴拿马', 'pa.png'],
 'Peru': ['秘鲁', 'pe.png'],
 'Philippines': ['菲律宾', 'ph.png'],
 'Papua New Guinea': ['巴布亚新几内亚', 'pg.png'],
 'Poland': ['波兰', 'pl.png'],
 'Puerto Rico': ['波多黎各', 'pr.png'],
 'Dem. Rep. Korea': ['朝鲜', 'nk.png'],
 'Portugal': ['葡萄牙', 'pt.png'],
 'Paraguay': ['巴拉圭', 'py.png'],
 'Qatar': ['卡塔尔', 'qa.png'],
 'Romania': ['罗马尼亚', 'ro.png'],
 'Russia': ['俄罗斯', 'ru.png'],
 'Rwanda': ['卢旺达', 'rw.png'],
 'W. Sahara': ['西撒哈拉', 'eh.png'],
 'Saudi Arabia': ['沙特阿拉伯', 'sa.png'],
 'Sudan': ['苏丹', 'sd.png'],
 'S. Sudan': ['南苏丹', 'ss.png'],
 'Senegal': ['塞内加尔', 'sn.png'],
 'Solomon Is.': ['所罗门群岛', 'sb.png'],
 'Sierra Leone': ['塞拉利昂', 'sl.png'],
 'El Salvador': ['萨尔瓦多', 'sv.png'],
# 'Somaliland': ['索马里兰', '.png'],
 'Somalia': ['索马里', 'so.png'],
 'Serbia': ['塞尔维亚', 'rs.png'],
 'Suriname': ['苏里南', 'sr.png'],
 'Slovakia': ['斯洛伐克', 'sk.png'],
 'Slovenia': ['斯洛文尼亚', 'si.png'],
 'Sweden': ['瑞典', 'se.png'],
 'Swaziland': ['斯威士兰', 'sz.png'],
 'Syria': ['叙利亚', 'sy.png'],
 'Chad': ['乍得', 'td.png'],
 'Togo': ['多哥', 'tg.png'],
 'Thailand': ['泰国', 'th.png'],
 'Tajikistan': ['塔吉克斯坦', 'tj.png'],
 'Turkmenistan': ['土库曼斯坦', 'tm.png'],
 'East Timor': ['东帝汶', 'tl.png'],
 'Trinidad and Tobago': ['特里尼达和多巴哥', 'tt.png'],
 'Tunisia': ['突尼斯', 'tn.png'],
 'Turkey': ['土耳其', 'tr.png'],
 'Tanzania': ['坦桑尼亚', 'tz.png'],
 'Uganda': ['乌干达', 'ug.png'],
 'Ukraine': ['乌克兰', 'ua.png'],
 'Uruguay': ['乌拉圭', 'uy.png'],
 'United States': ['美国', 'us.png'],
 'Uzbekistan': ['乌兹别克斯坦', 'uz.png'],
 'Venezuela': ['委内瑞拉', 've.png'],
 'Vietnam': ['越南', 'vn.png'],
 'Vanuatu': ['瓦努阿图', 'vu.png'],
 'West Bank': ['西岸', 'ps.png'],
 'Yemen': ['也门', 'ye.png'],
 'South Africa': ['南非', 'za.png'],
 'Zambia': ['赞比亚', 'zm.png'],
 'Zimbabwe': ['津巴布韦', 'zw.png'],
 'Mauritius': ['毛里求斯', 'mu.png'],
 # 'U.S. Virgin Is.': ['美属维尔京群岛', '.png'],
 'Malta': ['马耳他', 'mt.png'],
 'Faeroe Is.': ['法罗群岛', 'fo.png'],
 'Barbados': ['巴巴多斯', 'bb.png'],
 'Bahrain': ['巴林', 'nh.png'],
 'Cape Verde': ['佛得角', 'cv.png'],
 'Cayman Is.': ['开曼群岛', 'ky.png'],
}


```

## 第三步是从这个字典中取出数据，构建我们国别兴趣的单个md文件。

```markdown
# string = str(countries)
# string = string.replace(': ', ': [')
# string = string.replace(',', ', \'.png\'],\n')
# print(string)
path = r"C:\Users\Bachelor\Desktop\ABC\COU"
for key in countries :
    print(key)
    key2 = str(key).replace('.', '-',5)
    key2 = key2.replace(' ', '-', 5)
    key2 = key2.replace('ô', 'o', 5)
    key2= key2.rstrip('-')
    key2 = key2.rstrip(' ')
    key2 = key2.replace('--', '-')

    print(key2)
    with open(path + "/" + key2 + '.md', "w", encoding="utf-8") as f:
        f.write("---\n\n")
        f.write("title: %s\n\n" %key)
        f.write("author: Qiushi \n\n")
        f.write("countries: \n")
        f.write("- %s\n\n" %key2)
        f.write("type: %s\n\n" % key)
        #f.write("- %s-%s\n" % (year,imonth ))
        #f.write("- %s-%s-%s\n" % (year, imonth, idate))
        #f.write("- dailybrief\n")
        f.write("featuredImagePreview: '/flag/%s'\n\n" %countries[key][1])
        f.write("toc: false \n\n")
        f.write("---\n\n")
        f.write("Brief on %s\n\n" %key)
        f.write("%s简报 \n\n" % countries[key][0])
        f.write("<!--more-->\n\n")
        f.write("![国旗 flag](/flag/%s)" %countries[key][1])
        f.close()

```




<p align="right">Communication from Bachelor.</p> 

