---
title: CIA文件爬取，正则，可视化处理
author: Bachelor
date: 2022-09-10
authorLink: "/authors/bachelor"
featuredImagePreview: "/agency/CIA.png"
TocOpen: ture
regions:
- North-America
countries:
- United States
tags:
- dailybrief
multitype: 
- dailybrief
- posts

---
每日简报的策划,是为了加强对他国国情的认识,以及提升自己识别重要情报的能力。

以下是美国总统简报的公开检索途径，

https://nsarchive2.gwu.edu/NSAEBB/NSAEBB116/index.htm

https://www.cia.gov/readingroom/collection/presidents-daily-brief-1969-1977 from the Richard Nixon and Gerald Ford administrations.

https://www.cia.gov/readingroom/collection/presidents-daily-brief-1961-1969 from the Kennedy and Johnson administrations.


情报简报是新闻简报的延申，下面我们将参照每日简报组织自己的活动，以立长期规划。每天本组的产出
可以分两步，第一步做公开信源的新闻摘要，同时开展对美国总统简报每日的学习。在这部分学习中不断加强对他国国情的认识,以及提升自己识别重要情报的能力。

在国别情报会之前，我们可能先要形成每日新闻简报，然后是同志们一起交流之后写成的每日情报简报，在这个过程中，如果能形成国别的专题讨论，那也算是国别情报组的雏形了。


# 关于学习材料的爬取，我们主要使用python

## 第一步是下载网页
```markdown
import requests
import os


for j in range(0,124):
    r = requests.get('https://www.cia.gov/readingroom/collection/presidents-daily-brief-1961-1969?page=' + str(j))
    s = requests.session()
	#由于cia官网的落后，导致我们甚至需要用上的代码不带参数地运行一次来获取第一页。
    with open("cia"  + "/" + str(j) + ".html", "w", encoding='utf-8') as f:

        try:
            f.write(r.text)
            f.close()
			print( str(j) + "yes")
        except UnicodeEncodeError:
            print( str(j) + "fail")
    s.keep_alive = False
```
## 第二步是从这些网页中提取到文件链接和其日期(从文件名中获取)

```markdown
import requests
import os

path = './cia/'
files = os.listdir(path)
for file in range(13,124):
        FData = ''

        with open(f"{path}/{file}.html", "rb") as f:
            for line in f.readlines():
                line = line.lower()
                FData += line.decode()
        #FData = FData.replace('\n', '').replace('\r', '')
        print({file})
        #print(FData)

        #congress_pat = re.compile(r'<h4>(.*?)</h4>')
        #O = re.findall(congress_pat, FData)

		#经过多次尝试我发现这个div下的标签基本一样，除了文本正则基本没有办法摘出来。好在网页平均输出20个解密文件和相对固定的文件名，我们使用了两个列表p,q来对应储存。
        #congress_pat2 = re.compile(r'the president&#039;s(.*?)</a></h4>') 你之后就会明白为什么不用这个。。。
		congress_pat2 = re.compile(r'document/\d+(.*?)</a></h4>')
        p= re.findall(congress_pat2, FData)
        #p.insert(0,'null')

        print(len(p))
        #print(str(p))
        congress_pat3 = re.compile(r'png" /> <a href="(.*?)" type="application/pdf')
        q = re.findall(congress_pat3, FData)
        q.pop(0) #由于每一页都有其授权发布的那一个pdf文件，因此我们必须在文件列表中删去它
        #p.remove('https://www.cia.gov/readingroom/docs/pdb%20cm%20final%20kennedy%20and%20johnson_public%208%20sep%202015.pdf') 失败的删除尝试，don't know why
        print(len(q))
        #print(str(q))
		
		#下一步就是对应下载
        for j in range(0, 20):
            s = requests.session()
            x = q[j]
            r = requests.get(str(x))
            y = p[j]
		
            with open("file" + "/" + str(y) + ".pdf", "wb") as f:
                try:
                    f.write(r.content)
                    f.close()
                    print(str(y), str(x))
				except Exception:
					print(y, "出现错误11111111111111111111111111")
            s.keep_alive = False
            print( str(y) + "done")

```

所有的曲线救国都是因为踩了坑，比如文件名，有三种报告也就算了，居然还有特殊报告。。。
## 下面的就是正则文件名（为了以后进行格式化，进行标准时间处理）

```markdown
import os

# 输入文件夹地址
path = "C:/authors/Bachelor/final/special2/special"
files = os.listdir(path)

# 输出所有文件名，只是为了看一下
for file in files:
    print(file)

# 获取旧名和新名
i = 0
for file in files:
    # old 旧名称的信息
    old = path + os.sep + files[i]
    i += 1
	c = file.replace('intelligence', '') #相信我你要做很多这种处理
    c = c.replace('daily brief', '')
	
```
## 恭喜你，最后终于来到时间了。


```markdown
#你要用上一段代码把空格变成-，这样你得到了一大堆这样命名的文件”17-april-1967“，终于可以进行最后一步了
for file in files:
    # old 旧名称的信息
    old = path + os.sep + files[i]
    # new是新名称的信息，这里的操作是删除了最前面的不同的简报名称，比如checklist 和daily report，最神奇的还有几篇特殊报告。这些报告会导致程序的命名出错。所以你会发现最后几步尤其难以完成。
    file = file.rstrip('.pdf')
    file = file.split('-')[2] + '-'+file.split('-')[1] +'-'+ file.split('-')[0]+'.pdf'
    a=file.split('-')[2]
    b=file.split('-')[1]
    c=file.split('-')[0]
    print(file,a,b,c,'.pdf')
    new = path + os.sep + file
    #new = "C://-10" + os.sep + file[8:]
    #re.sub(r'\d{6}|\s', '', str(i))
    # 新旧替换
    i += 1
    try:
        os.rename(old, new)
        print(i,file)
        file=''
    except Exception:
        print(file, "出现错误11111111111111111111")
        file = ''

	
```


<p align="right">Communication from Bachelor.</p> 

