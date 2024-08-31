---
title: 前置参数批量修改
author: Bachelor
date: 2022-09-23
authorLink: "/authors/bachelor"
featuredImagePreview: "/agency/CIA.png"
TocOpen: ture
tags:
- documents
multitype: 
- documents
---

在架构调整时，我们的posts前置变量总是在不断变化，而同时这些posts又已经在生产环境之下，受过修改。因此，无损迁移posts，成为了本文的主题。
<!--more-->

# 关于文件内容读取和修改，我们主要使用python

## 第一步是写好正则规则
```markdown

import re, os

path1 = r'C:\Users\Bachelor\Desktop\ABC\our\content\dailybrief'

old_str='---((.|\n|\r)*)<!--more-->' #包括摘要
#old_str='---((.|\n|\r)*)---' 
files = os.listdir(path1)

```
## 第二步构建自己新的前置变量

```markdown

for j in range(0, 4870):
    file = files[j]
    file = file.rstrip('.html')
    file = file.rstrip('.md')
    year = file.split('-')[0]
    month = file.split('-')[1]
    date= file.split('-')[2][0:2]
    fdate=year+'-'+month+'-'+date
    print(j,year,file)

    c = month.replace('01', 'January')
    c = c.replace('06','June' )
    c = c.replace('03','March' )
    c = c.replace('05','May' )
    c = c.replace('11','November' )
    c = c.replace('09','September')
    c = c.replace('04','April' )
    c = c.replace('08','August' )
    c = c.replace('12','December' )
    c = c.replace('02','February' )
    c = c.replace('07', 'July')
    c = c.replace('10','October')

    c = month.replace('01', 'January')
    c = c.replace('06','June' )
    c = c.replace('03','March' )
    c = c.replace('05','May' )
    c = c.replace('11','November' )
    c = c.replace('09','September')
    c = c.replace('04','April' )
    c = c.replace('08','August' )
    c = c.replace('12','December' )
    c = c.replace('02','February' )
    c = c.replace('07', 'July')
    c = c.replace('10','October')


    imonth = month
    if month == '10':
        print(month)
    else:
        month = month.replace('0', '')
        print(month)

    idate=date
    if date[0] == '0':
        date = date.replace('0', '')

    title = 'Intelligence History on ' + c + ' ' + date
    a ="---\n"
    a=''.join([a, ("title: %s\n" %file)])
    a=''.join([a,("date: %s\n" %fdate )])
    a=''.join([a,("author: CIA \n")])
    a = ''.join([a, ("authorLink: \"/authors/cia\"\n")])
    a=''.join([a,("timestamp: \n")])
    a=''.join([a,("- %s\n" %year)])
    a=''.join([a,("- %s-%s\n" % (year,imonth ))])
    a=''.join([a,("multitype: \n")])
    a=''.join([a,("- cia\n")])
    a=''.join([a,("tags: \n")])
    a=''.join([a,("- dailybrief\n")])
    a=''.join([a,("featuredImagePreview: \'/agency/CIA.png\'\n")])
    a=''.join([a,("---\n\n\n")])
    a = ''.join([a, ("Presidential Daily Brief On %s %s %s\n\n" % (year, c, date))])
    a=''.join([a,("此情报简报于%s年%s月%s日被递交给时任美国总统\n\n" %(year,month,date))])

    a=''.join([a,("<!--more-->\n\n")])



```


## 下面的就是python的读取模式，替换后覆盖写入，不损失原来的文本内容。

```markdown

    with open(path1 + "/" + file + '.md', mode='r+', encoding="utf-8") as f1:

        filec = f1.read()
        # print(filec, 'what')
        new_str = a
        b=re.sub(old_str, new_str, filec)
        print(j,file,'this______________________')
        # 设置位置到页面顶部插入数据
        f1.seek(0)
        # 在文件中写入替换数据
        f1.write(b)
        # 截断文件大小
        f1.truncate()

        f1.close()

```

## 恭喜你，成功无损更新



<p align="right">Communication from Bachelor.</p> 

