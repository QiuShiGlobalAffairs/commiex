---
title: pdf移动端适配，转base64图片，可视化处理
author: Bachelor
date: 2022-09-10
authorLink: "/authors/bachelor"
featuredImagePreview: "/agency/CIA.png"
TocOpen: ture
tags:
- dailybrief

multitype: [
documents, 
posts
]
---

每日简报的策划，终于到了展示阶段。

以下是美国总统简报的公开检索途径，

https://nsarchive2.gwu.edu/NSAEBB/NSAEBB116/index.htm

https://www.cia.gov/readingroom/collection/presidents-daily-brief-1969-1977 from the Richard Nixon and Gerald Ford administrations.

https://www.cia.gov/readingroom/collection/presidents-daily-brief-1961-1969 from the Kennedy and Johnson administrations.


情报简报是新闻简报的延申，下面我们将参照每日简报组织自己的活动，以立长期规划。每天本组的产出
可以分两步，第一步做公开信源的新闻摘要，同时开展对美国总统简报每日的学习。在这部分学习中不断加强对他国国情的认识,以及提升自己识别重要情报的能力。

在国别情报会之前，我们可能先要形成每日新闻简报，然后是同志们一起交流之后写成的每日情报简报，在这个过程中，如果能形成国别的专题讨论，那也算是国别情报组的雏形了。


路径：pdf到html，到md的iframe，pc端的高度适配（同源问题），再到移动端的js适配（div外套缩放）。

## 第一步是pdf转html
```markdown
import os
import subprocess

# for root, dirs, files in os.walk(path, topdown=False):
# _path = os.path.join(root, name)
#path = "./md"
path = './pdf2html/print/'
files = os.listdir(path)


for j in range(3000, 4000):
    file = files[j]
    sh = r'./pdf2html/pdf2htmlEX.exe'  # 这里r可以解决空格和中文字符的烦恼
    # proc=subprocess.Popen(sh, stdin=subprocess.PIPE)
    #a = './pdf2html/print/' + file
    a = path + file
    #b=  '--dest-dir ./pdf2html/out/'
    # print(a)
    p = subprocess.Popen(sh + ' --zoom 1.3 ' + a)
    print(p.communicate()[0])
    print(j, file)

```
## 第二步是在md用iframe中读取这些网页

```markdown

import os
import subprocess

# for root, dirs, files in os.walk(path, topdown=False):
# _path = os.path.join(root, name)
path = r"C:\Users\Bachelor\Desktop\ABC\CIA"
path2 = r'C:\Users\Bachelor\Desktop\ABC\dailybrief'
#path = r"C:\Users\Bachelor\node_modules\showdown\bin\md"

files = os.listdir(path)
for j in range(0, 4865):
    file = files[j]
    file = file.rstrip('.html')
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


    imonth = month
    if month == '10':
        print(month)
    else:
        month = month.replace('0', '')
        print(month)

    idate=date
    if date[0] == '0':
        date = date.replace('0', '')

    with open(path2 + "/" + file + '.md', "w", encoding="utf-8") as f:
        f.write("---\n")
        f.write("title: %s\n" %file)
        f.write("date: %s\n" %fdate )
        f.write("author: CIA \n")
        f.write("tags: \n")
        f.write("- %s\n" %year)
        f.write("- %s-%s\n" % (year,imonth ))
        #f.write("- %s-%s-%s\n" % (year, imonth, idate))
        f.write("- dailybrief\n")
        f.write("featuredImagePreview: '/agency/CIA.png'\n")
        f.write("---\n\n\n")
        idate=date.replace('0','')
        f.write("此情报简报于%s年%s月%s日被递交给时任美国总统\n\n" %(year,month,date))
        f.write("Presidential Daily Brief On %s/%s/%s\n\n" % (year, imonth, idate))
        filepath = '/CIA/' + file + '.html'
		
        f.write("<div id=\"over\" style=\"width:100%; overflow:hidden\"> <iframe id=\"sFrame\" name=\"sFrame\" frameborder=\"no\" border=\"0\"  allowfullscreen marginwidth=\"0\" scrolling=\"no\" src = \" {} \"  style = \" position:absulute; width: 806px; top: 300;\" > </iframe> </div>".format(filepath))
        f.close()
    print(file)

```

## 要正确获取iframe的高度，iframe还要缩放。所以服务端的js代码如下
所有的曲线救国都是因为踩了坑，

```markdown

    (function() {

        function run() {
            // when the main frame has already been loaded, the check its height
			iframe = document.getElementById('sFrame'),
			over = document.getElementById('over'),
			iframe.height=iframe.contentWindow.document.documentElement.scrollHeight;
			let x = (screen.width-16) / 806;			
			if (screen.width<822 )
			{			
			let y=iframe.contentWindow.document.documentElement.scrollHeight;
		    iframe.style.transformOrigin='0 0';
			iframe.style.transform = `scale(${x})`;	
			let h = y*x;	
			over.style.height=h +'px';
			}				
            setTimeout(run, 200);
			
        }
        run();
    })();

	
```
## 防止js报错中断执行
恭喜你，移动端也已经适配了。但是js初始启动时有时不能识别scrollHeight,所以我们要使用try，
```markdown
    (function() {

        function run() {
            // when the main frame has already been loaded, the check its height
			
			try{
			over = document.getElementById('over'),
			iframe = document.getElementById('sFrame'),
			iframe.height=iframe.contentWindow.document.documentElement.scrollHeight;			
			}catch(e){
				console.log(e); 
				}			
			let x = (screen.width-16) / 806;			
			if (screen.width<822 )
			{	
					
			try{
			let y=iframe.contentWindow.document.documentElement.scrollHeight;
		    iframe.style.transformOrigin='0 0';
			iframe.style.transform = `scale(${x})`;	
			let h = y*x;	
			over.style.height=h +'px';
			
				}catch(e){
				console.log(e); 
				}


			}				
            setTimeout(run, 200);
			
        }
        run();
    })();










```

## 最后一步是pdf的空白问题
这个需要更改pdf的宽度，我们使用pdf-crop-margins这个包。


```markdown

import os
import subprocess

# for root, dirs, files in os.walk(path, topdown=False):
# _path = os.path.join(root, name)
#path = "./md"
path = 'C:/Users/Bachelor/OneDrive/bill/pdf2html/print/'
files = os.listdir(path)
print(files)
for j in range(4870, 2375, -1):
    file = files[j]
    print(j, file)


    # sh = r'pdfcrop --margins '  # 这里r可以可以不管空格和中文字符的烦恼
    # # proc=subprocess.Popen(sh, stdin=subprocess.PIPE)
    # #a = './pdf2html/print/' + file
    # a = path + file
    # print(a)
    # #b=  '--dest-dir ./pdf2html/out/'
    # # print(a)
    # p = subprocess.Popen(sh + '\'0 0 -200 0\' --clip ' + a + ' ' + file)
    # print(p.communicate()[0])
    # print(j, file)
    # sh = r'pdf-crop-margins '  # 这里r可以可以不管空格和中文字符的烦恼
    # # proc=subprocess.Popen(sh, stdin=subprocess.PIPE)
    # #a = './pdf2html/print/' + file
    # a =  'new' + file

    sh = r'pdf-crop-margins '  # 这里r可以可以不管空格和中文字符的烦恼
    # proc=subprocess.Popen(sh, stdin=subprocess.PIPE)
    ifile = path + file


    #b=  '--dest-dir ./pdf2html/out/'
    # print(a)
    com = sh + ' -u -ap4 0 0 120 0 ' + ifile + ' -o ' + file
    print(com)
    p = subprocess.Popen(com)
    print(p.communicate()[0])
    print(j, file)




```


<p align="right">Communication from Bachelor.</p> 

