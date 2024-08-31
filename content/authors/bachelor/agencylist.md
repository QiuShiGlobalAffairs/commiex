---
title: 机构和相关信息的对应字典
author: Bachelor
date: 2022-09-28
authorLink: "/authors/bachelor"
featuredImagePreview: "/agency/un.svg"
TocOpen: ture
tags:
- documents
multitype: 
- documents
---

世界上有近千政党，给他们分别建立数据库是非常必要的，我们首先从他们的中英文译名和旗帜开始建立index。

<!--more-->

## 关于政党列表，我们检索一下互联网，发现已经存在两种数据集可供我们参考和使用


[solidnet 提供了一个便捷检索网页](http://www.solidnet.org/links/communist-and-workers-parties/)

## 第一步是先搞出字典。


```markdown
agency = {  'KKE': ['Communist Party of Greece 希腊共产党', 'https://inter.kke.gr/', 'Greece', '/agency/kke.png', ''],
  'TKP': ['Communist Party Of Turkey 土耳其共产党', 'https://www.tkp.org', 'Turkey', '/agency/tkp.png', '(+90) 3124172968 int@tkp.org.tr'],
  'NPC': ['中国人大', 'http://www.npc.gov.cn/', 'China', 'https://ls.chiculture.org.hk/sites/minisite/files/styles/free_style_image_style/public/2018-08/vcg111146927453.jpg?itok=lP0nQZIV', ''],
  'MLPD': ['德国马列主义党', 'https://www.mlpd.de/', 'Germany', '/agency/mlpd.png', ''],
  'SPD': ['社会民主党', 'https://www.spd.de/', 'Germany', '/agency/spd.svg', ''],
  'PKSH': ['Communist Party of Albania', '', 'Albania', '/agency/pksh.png', '(+355) 382274111 (+355) 4251271 gjonbruci5@yahoo.com'],
  'PADS': ['Algerian Party for Democracy and Socialism', '', 'Algeria', '/agency/pads.jpg', '(+331) 46637607 (+331) 46772082 (+331) 42537882 (+331) 42537882 (+331) 46637607 pads.dz@laposte.net'],
  'PCA': ['Communist Party of Argentina', 'http://www.pca.org.ar', 'Argentina', '/agency/pca.png', '(+54) 1143040066 (+54) 1143040068 (+54) 1143040068 rriipca@pca.org.ar jkreyness@yahoo.com'],
  "CPA": ['Communist Party of Armenia', '', 'Armenia', '/agency/cpa.png', '(+37) 410541917 ArmenianCPInt@gmail.com Komkus@mail.ru'],
  'ACC': ['Communist Party of Australia', '	http://www.cpa.org.au', 'Australia', '/agency/acc.png', 'international@cpa.org.au cpa@cpa.org.au'],
  'KPO': ['Communist Party of Austria', 'http://www.kpoe.at', 'Austria', '/agency/kpo.png','international@kpoe.at'],
  'PDA': ['Party of Labour of Austria', 'http://www.parteiderarbeit.at', 'Austria', '/agency/pda.png', '(+43) 6643520469 international@parteiderarbeit.at'],
  'ACP': ['Communist Party of Azerbaidjan', '', 'Azerbaidjan', '/agency/azercp2.png', '(+99) 4503253256 (+99) 4556138749 (+99) 4503165853 nurullayev@mail.ru kommunist-az@mail.ru hasanov_1951@mail.ru'],
  'ACP': ['Communist Party of Azerbaidjan', '', 'Azerbaidjan', '/agency/azercp1.png', '(+99) 412441753 (+99) 412948937 r.kobalt@mail.ru'],
  'DPT': ['Democratic Progressive Tribune', '	http://www.altaqadomi.com/', 'Bahrain', '/agency/dpt.png', '(+97) 317780007 (+97) 317780006 fa.almenbar@gmail.com'],
  'CPB': ['Communist Party of Bangladesh', 'http://www.cpbbd.org/', 'Bangladesh', '/agency/cpb.png', '(+88) 029558612 (+88) 027172845 (+88) 029552333 cpbinter@gmail.com info@cpb.org.bd'],
  'WPB': ['Workers\'Party of Bangladesh', '', 'Bangladesh', '/agency/wpb.png',	'(+88) 029567975 (+88) 029558545 wpartybd@bangla.net'],
  'BCP': ['Communist Party of Belarus', '', 'Belarus', '/agency/bcp.png', '(+375) 172934888 atamanovgp@tut.by'],
  'PC': ['Communist Party of Belgium', 'http://www.pcb-cpb.com', 'Belgium', '/agency/pc.png', '(+32) 493031367 (+32) 478503550 andersenrene@outlook.com particommuniste.liege@gmail.com'],
  'PTB': ['Workers\'Party of Belgium', 'http://www.ptb.be', 'Belgium', '/agency/ptb.png', 'http://www.pvda.be (Dutch) (+32) 25040139 (+32) 25040141 international@ptb.be'],
  'PCB': ['Communist Party of Bolivia', 'http://www.pcbolivia.net/', 'Bolivia', '/agency/bolivia.png', '	(+59) 12423252 (+59) 22770535 marxmil@hotmail.com pcb.rrii@gmail.com'],
  'PCB': ['Brazilian Communist Party', 'http://www.pcb.org.br', 'Brazil', '/agency/brazilianCP.png', '	(+55) 2122620855 (+55) 2122620855 pcb.partidocomunistabrasileiro@gmail.com eg_serra@yahoo.com.br pcb@pcb.org.br'],
  'PCDOB': ['Communist Party of Brazil', 'http://www.pcdob.org.br', 'Brazil', '/agency/pcdob.png', 'http://www.vermelho.org.br www.i21.org.br (+55) 1130541800 (+55) 1130541822 (+55) 1130541821 (+55) 1130541848 internacional@pcdob.org.br'],
  'britaincp': ['Communist Party of Britain', 'https://www.communistparty.org.uk', 'Britain', '/agency/britaincp.png', '(+44) 2086861659 info@communistparty.org.uk international@communistparty.org.uk'],
  'NCP': ['New Communist Party of Britain', 'http://www.newworker.org', 'Britain', '/agency/ncp.png', '(+44) 2072234052 party@ncp.clara.net'],
  'bulgariacp': ['Communist Party of Bulgaria', 'https://comparty.bg/', 'Bulgaria', '/agency/bulgariacp.png', '(+35) 929816093 (+35) 929816093 comparty@abv.bg'],
  'bulgcommunists': ['Party of the Bulgarian Communists', '', 'Bulgaria', '/agency/bulgcommunists.png', '(+35) 98961133 (+35) 9898322455 (+35) 924702573 bcp.gd@mail.bg bcpgd1949@gmail.com'],
  'CA': ['Communist Party of Canada', 'http://www.communist-party.ca', 'Canada', '/agency/ canada.png', '(+14) 164692446 inter@cpc-pcc.ca dgarvie@cpc-pcc.ca'],
  'CL': ['Communist Party of Chile', 'http://www.pcchile.cl/', 'Chile', '/agency/chilecp.png', '(+56) 27295700 (+56) 27295714 internacional@pcchile.cl'],
  'CCP': ['Communist Party of China', 'http://www.idcpc.org.cn', 'China', '/agency/ccp.png', 'http://www.china.org.cn/english/index.htm http://english.cpc.people.com.cn/ (+86) 1083907267 (+86) 1083907268 info@idcpc.org.cn yuliagustavo@163.net'],
  'PCC': ['Colombian Communist Party', 'http://www.pacocol.org', 'Colombia', '/agency/pcc.png', '(+57) 13203204 (+57) 12854188 (+57) 13384742 jaimecaisedo@gmail.com sergiodezubiria@gmail.com notipaco@pacocol.org'],
  'FARC-EP': ['FARC-EP', 'http://www.farc-ep.co', 'Colombia', '/agency/farc-ep.png', 'http://www.pazfarc-ep.org http://www.farc-epeace.org cominiternacional.farc.ep@gmail.com'],
  'PVP': ['People\'s Vanguard Party', '', 'Costa Rica', '/agency/pvp.png', '(+50) 622258300 (+50) 622810484 vanguardiapopularinternacional@gmail.com partidocomunista1931@gmail.com'],
  'SRP': ['Socialist Workers\'Party of Croatia', 'http://www.srp.hr', 'Croatia', '/agency/srp.png', '(+38) 514835340 (+38) 912219036 (+38) 14835340 srp@srp.hr vladimir.kapuralin@pu.t-com.hr'],
  'PCC': ['Communist Party of Cuba', 'http://www.pcc.cu/', 'Cuba', '/agency/pcc.png', '(+53) 78605678 (+53) 78593047 europari@cc.cu vjdri@cc.cu'],
  'AKEL': ['the Progressive Party of the Working People - AKEL', 'http://www.akel.org.cy', 'Cyprus', '/agency/akel.png', ''],
  'KSCM': ['Communist Party of Bohemia and Moravia', 'http://www.kscm.cz', 'Czech', '/agency/kscm.png', 'http://www.kscm.cz/english (+42) 0222897111 (+42) 0222897207 info@kscm.cz leftnews@kscm.cz jaroslav.roman@kscm.cz'],
  'DK': ['Communist Party in Denmark', 'http://www.kommunisterne.dk', 'Denmark', '/agency/denmarkin.png', '(+45) 38882833 (+45) 38882433 Kpid@Kommunisterne.Dk'],
  'DKPDK': ['Communist Party of Denmark', 'http://www.dkp.dk', 'Denmark', '/agency/dkpdk.png', '(+45) 33916644 dkp@dkp.dk int@dkp.dk'],
  'FR': ['Force Of The Revolution', 'https://www.fuerzadelarevolucion.com', 'Dominican Republic', '/agency/fr.png', '(+80) 93336585 Jgomez20@gmail.com r.alvarezc@hotmail.com ofic.rdrifr@gmail.com'],
  'PCE': ['Communist Party Of Ecuador', 'http://pcecuador.org/', 'Ecuador', '/agency/pce.png', '(+593) 22909454 (+593) 42401462 (+593) 422248643 (+593) 997195448 ccentral@pcecuador.org winstoncamp@yahoo.com mariomendoza2004@yahoo.es inter.pcecuador@hotmail.com'],
  'ECP': ['Egyprian Communist Party', 'http://www.cp-egypt.com', 'Egypt', '/agency/ecp.png', '(+20) 101078617 (+20) 223921315 cpegypt@gmail.com'],
  'PCS': ['Communist Party of El Salvador', '', 'El Salvado', '/agency/pcs.png', 'elsalvadorpc@hotmail.com'],
  'CPE': ['Communist Party of Estonia ', '', 'Estonia', '/agency/cpe.png', '(+37) 23591174 (+37) 23591174 gungerburg@mail.ru narvaSRG@rambler.ru'],
  'SKP': ['Communist Party of Finland', 'http://www.skp.fi', '', '/agency/skp.png', '(+358) 977438150 (+358) 977438160 skp@skp.fi'],
  'PCF': ['French Communist Party', 'http://www.pcf.fr', 'France', '/agency/pcf.png', '(+33) 140401293 (+33) 140401286 (+33) 142404027 international@pcf.fr interpcf@gmail.com'],
  'GCP': ['Unified Communist Party of Georgia', '', 'Georgia', '/agency/gcp.png', '(+995) 599917987 tpipia@rambler.ru cpgeo@narod.ru'],
  'DKP': ['German Communist Party', 'http://www.dkp.de', 'Germany', '/agency/dkp.png', ''],
  'GPC': ['Guadeloupean Communist Party', '', 'Guadelupe', '/agency/gpc.png', '(+59) 0821945 (+59) 0836990 dc500009@exchange.france.ncr.com'],
  'PPP': ['People\'s Progressive Party', 'http://www.pppguyana.org', 'Guyana', '/agency/ppp.png', '(+592) 2272095 (+592) 2274301 (+592) 2274302 (+592) 2272096 (+592) 2278765 gensecppp@gmail.com'],
  'HWP': ['Hungarian Workers\'Party', 'http://www.munkaspart.hu', 'Hungary', '/agency/hwp.png', ''],
  'CPI-M': ['Communist Party Of India (Marxist)', 'http://www.cpim.org', 'India', '/agency/cpim.png', 'https://www.facebook.com/cpimcc (+91) 1123344918 (+91) 1123747435 (+91) 1123747436 (+91) 1123747483 cc@cpim.org intl@cpim.org'],
  'CPI': ['Communist Party οf India', 'http://www.communistparty.in/', 'India', '/agency/cpi.png', '(+91) 1123232801 (+91) 1123235099 (+91) 1123235058 (+91) 1123235543 internationaldept@communistparty.in cpiofindia@gmail.com'],
  'TPI': ['Tudeh Party of Iran', 'http://www.tudehpartyiran.org', 'Iran', '/agency/tpi.png', '(+44) 7790277770 (+49) 303241627 mardom@tudehpartyiran.org navid.shomali@btinternet.com'],
  'KCP': ['Communist Party of Kurdistan-Iraq', 'http://www.regaykurdistan.com', 'Iraq', '/agency/kcp.jpg', '(+964) 7504513184 (+964) 7504492282 info_kcp@yahoo.com info_kcp@yahoo.com'],
  'ICP': ['Iraqi Communist Party', 'http://www.iraqicp.com', 'Iraq', '/agency/icp.png', '(+44) 2086422981 salamicp10@gmail.com icpinter@yahoo.co.uk info@iraqicp.com'],
  'CPIE': ['Communist Party of Ireland', 'http://www.communistpartyofireland.ie', 'Ireland', '/agency/cpie.png', '(+353) 16708707 natoffice@communistparty.ie'],
  'IWP': ['The Workers\'Party of Ireland', 'http://www.workersparty.ie', 'Ireland', '/agency/iwp.png', '(+353) 18733916 (+353) 18748702 international@workersparty.ie info@workersparty.ie'],
  'WPI': ['The Workers\'Party of Ireland', 'https://workerspartyirelandorg.wordpress.com/', 'Ireland', '/agency/wpi.png', '(+44) 2890328663 wpi.international@gmail.com'],
  'MAKI': ['Communist Party Of Israel', 'http://www.maki.org.il', 'Israel', '/agency/maki.png', '(+972) 36293944 (+972) 36297263 info@maki.org.il interelations@maki.org.il'],
  'CPIT': ['Communist Party (Italy)', 'http://ilpartitocomunista.it/', 'Italy', '/agency/.png', 'internazionale@ilpartitocomunista.it nazionale@ilpartitocomunista.it'],
  'PCI': ['Italian Communist Party', 'https://www.ilpartitocomunistaitaliano.it', 'Italy', '/agency/pci.png', '(+39) 3319203447 international@ilpartitocomunistaitaliano.it'],
  'PCR': ['Party Of The Communist Refoundation', 'http://www.rifondazione.it/', 'Italy', '/agency/pcr.png', '(+39) 06441821 (+39) 0644182207 sitoprc@rifondazione.net esteri.prc@rifondazione.it'],
  'CPJ': ['Japanese Communist Party', 'http://www.jcp.or.jp', 'Japan', '/agency/cpj.png', 'http://www.japan-press.co.jp/ (+813) 54748421 (+813) 37460767 intl@jcp.jp'],
  'JCP': ['Jordanian Communist Party', 'http://www.jocp.org', 'Jordan', '/agency/jcp.png', '	(+962) 64624939 (+962) 64624939 jcp@nets.com.jo jcplive@umniahlive.net'],
  'KAZCP': ['Communist Party of Kazakhstan', 'http://www.komparty.kz/', 'Kazakhstan', '/agency/kazcp.png', '(+772) 72911400 komparty@list.ru'],
  'SMK': ['Socialist Movement of Kazakhstan', 'http://www.socialismkz.info/', 'Kazakhstan', '/agency/smk.jpg', 'socialismkz@gmail.com ainurkurmanov@gmail.com'],
  'PCK': ['Party of the Communists of Kyrgyzstan', 'Kirgizia', '', '/agency/pck.png', '(+996) 312624999 (+996) 312660401 mars40@list.ru'],
  'WPK': ['Workers Party of Korea', '', 'Korea', '/agency/wpk.png', '(+850) 23815855 (+39) 0654220749 (+850) 23814657 (+39) 54210090 wpkint@star-co.net.kp dprkembroma@outlook.com'],
  'PRP': ['Peoples\'Revolutionary Party', '', 'Laos', '/agency/prp.png', '(+856) 21414042 (+856) 214140423 party.relationsdep.la@gmail.com ri.dept.la@gmail.com'],
  'LSP': ['Socialist Party of Latvia', 'http://www.latsocpartija.lv', 'Latvia', '/agency/lsp.png', '(+371) 67555535 (+371) 67555535 latsocpartija@inbox.lv'],
  'LCP': ['Lebanese Communist Party', 'http://www.lcparty.org', 'Lebanon', '/agency/lcp.png', '(+961) 1739615 (+961) 1739616 (+961) 1739617 (+961) 1739615 (+961) 1739616 (+961) 1739617 lcparty.lcparty@gmail.com omar.deeb@gmail.com'],
  'SP': ['Socialist Party', 'https://socialistupartija.blogspot.com/', 'Lithuania', '/agency/sp.png', '(+370) 67117212 socialistinislf17@gmail.com'],
  'KPL': ['Communist Party of Luxembourg', 'http://www.kp-l.org', 'Luxembourg', '/agency/kpl.png', '(+352) 44606621 (+352) 44606666 kpl@zlv.lu aruckert@zlv.lu'],
  'AKFM': ['Party of the Congress for the Independence of Madagascar', '', 'Madagascar', '/agency/akfm.png', '(+261) 202227065 (+261) 202226828 (+261) 202227065 (+261) 202226828 aakfm@netclub.mg antokonykongresyakfm@gmail.com'],
  'CPM': ['Communist Party of Malta', 'http://communistpartymalta.blogspot.com/', 'Malta', '/agency/cpm.png', '(+35) 621223537 communistpartymalta@gmail.com'],
  'PCM': ['Communist Party of Mexico', 'http://www.comunistas-mexicanos.org', 'Mexico', '/agency/pcm.png', '(+52) 7343425838 (+52) 7343425838 internacionalpcm@gmail.com'],
  'PPS': ['Popular Socialist Party - National Political Association', 'http://www.pps.org.mx', 'Mexico', '/agency/pps.png', '(+52) 55330816 (+52) 55330817 (+52) 55330818 (+52) 55330816 (+52) 55330817 (+52) 55330818 ppsprens@infinitummail.com ppsdn2003@yahoo.com.mx jaogazp@hotmail.com'],
  'PPSM': ['Popular Socialist Party of Mexico', 'http://www.ppsm.org.mx', 'Mexico', '/agency/ppsm.png', '(+52) 556722057 (+52) 556091896 ppsmexico@gmail.com amezcua910@yahoo.com.mx'],
  'PCRM': ['Party of Communists Of Republic of Moldova', 'http://www.pcrm.md/', 'Moldova', '/agency/pcrm.png', '(+373) 22249441 (+373) 22233673 info@pcrm.md pcrmcc@gmail.com'],
  'UML': ['Communist Party of Nepal UML', 'https://www.ncp.org.np', 'Nepal', '/agency/uml.png', '(+977) 14378055 (+977) 14015980 dfauml@gmail.com'],
  'NCPN': ['New Communist Party of the Netherlands', 'http://www.ncpn.nl', 'Netherlands', '/agency/ncpn.png', '	(+31) 206825019 international@ncpn.nl'],
  'CPNM': ['Communist Party of Macedonia', '', 'North Macedonia', '/agency/cpnm.png', '(+389) 23177248 (+389) 23177248 cpmmkd@gmail.com'],
  'NKP': ['Communist Party of Norway', 'http://www.nkp.no', '', '/agency/nkp.png', '(+47) 22716044 nkp@nkp.no'],
  'CPP': ['Communist Party of Pakistan', 'http://www.cpp.org.pk', 'Pakistan', '/agency/cpp.png', '(+92) 222654531 (+92) 222654531 cppk1948@gmail.com'],
  'PALLCP': ['Palestinian Communist Party', 'http://www.pallcp.ps', 'Palestine', '/agency/pallcp.png', '(+97) 92515830 (+97) 22267055 (+97) 222267644 (+97) 92515075 palestinian_cp_alqam@hotmail.com info@pallcp.ps'],
  'PPPPS': ['Palestinian People\'s Party', 'http://www.ppp.ps', 'Palestine', '/agency/pppps.png', '(+97) 22963593 (+97) 22963592 taqazaqel@yahoo.com'],
  'PTP': ['Party of The People', 'http://www.elpartidodelpueblo.org', 'Panama', '/agency/ptp.png', '(+507) 2259025 (+507) 2272194 partidodelpueblopa@yahoo.com elpartido@elpartidodelpueblo.org'],
  'PCPA': ['Paraguayan Communist Party', 'http://www.pcparaguay.org/', 'Paraguay', '/agency/pcpa.png', '(+595) 21225116 (+595) 972624390 (+595) 21621836 (+595) 21621836 inter@pcparaguay.org rrii@pcparaguay.org'],
  'Patria Roja': ['Communist Party of Peru', 'http://www.patriaroja.org.pe/', 'Peru', '/agency/patriaroja.png', '(+511) 4262366 (+511) 99386928 pcdelp@patriaroja.org.pe partidosec@yahoo.com amorenor@speedy.com.pe'],
  'PCPPE': ['Peruvian Communist Party', 'https://pcp.pe', 'Peru', '/agency/pcppe.png', 'http://www.pcperuano.com (+511) 4331634 (+511) 4715399 unidad@ec-red.com contacto@pcp.pe pcperuano.rrii@gmail.com'],
  'PKP-1939': ['Philippine Communist Party', 'http://www.pkp1930.org', 'Philippines', '/agency/pkp.png', '	http://www.pkp-1930.com (+632) 3590201 (+632) 9395791 parisantonio2001@yahoo.com philcompar@yahoo.com'],
  'KPP': ['Communist Party of Poland', 'http://www.kom-pol.org', 'Poland', '/agency/kpp.png', '(+48) 228334288 (+48) 228334288 int@kompol.org kompol@o2.pl beata_karon@o2.pl'],
  'PCP': ['Portuguese Communist Party', 'http://www.pcp.pt', 'Portugal', '/agency/pcp.png', 'http://www.pcp.pt/en (+351) 217813800 (+351) 217969824 internacional@pcp.pt'],
  'PCR': ['Romanian Communist Party', '', 'Romania', '/agency/pcr.png', '	(+40) 216423615 (+40) 216423615 pantazipcr@yahoo.com'],
  'PSR': ['Socialist Party', 'http://www.pasro.ro', 'Romania', '/agency/psr.png', '(+40) 212522887 (+40) 314057078 (+40) 314057077 (+40) 214133354 contact@pasro.ro gheorghitazbaganu@yahoo.com'],
  'KPRF': ['Communist Party Of The Russian Federation', 'http://www.kprf.ru', 'Russia', '/agency/kprf.png', '(+74) 956927646 (+74) 956927646 (+74) 956925685 inter@kprf.ru zabirov@duma.gov.ru'],
  'CPSU': ['Communist Party of Soviet Union', 'http://www.cpsu.by', 'Russia', '/agency/cpsu.png', 'http://www.cpsu.by cpsu.msk@gmail.com'],
  'RCWP-CPSU': ['Russian Communist Workers Party', 'https://ркрп.рус/', 'Russia', '/agency/rcwp-cpsu.png', '(+78) 122742772 (+78) 122748073 (+78) 122742818 rkrp-ck@yandex.ru'],
  'UCPSU': ['Union Of Communist Parties', 'http://skpkpss.ru/', 'Russia', '/agency/ucpsu.png', '(+74) 956921769 (+74) 956925476 inter.ucp@gmail.com'],
  'KS': ['Communists Of Serbia', 'http://www.komunistisrbije.rs/', 'Serbia', '/agency/ks.png', '(+381) 113514478 komsrb@open.telekom.rs'],
  'NKPJ': ['New Communist Party of Yugoslavia', 'http://www.nkpj.org.rs', 'Serbia', '/agency/nkpj.png', '(+381) 112400628 (+381) 112400640 int_nkpj@yahoo.com'],
  'KSS': ['Communist Party of Slovakia', 'http://www.kss.sk', 'Slovakia', '/agency/kss.png', '(+421) 244644101 (+421) 244362540 sekr@kss.sk'],
  'SACP': ['South African Communist Party', 'http://www.sacp.org.za', 'South Africa', '/agency/sacp.png', '(+27) 113393621 (+27) 113393622 (+27) 113394244 international@sacp.org.za alex@sacp.org.za'],
  'SPCE': ['Communist Party of Spain', 'http://www.pce.es', 'Spain', '/agency/spce.png', '(+34) 913004969 (+34) 913004744 internacional@pce.es comitecentral@pce.es'],
  'PCPE': ['Communist Party of the Peoples of Spain', 'https://www.pcpe.es', 'Spain', '/agency/pcpe.png', 'internacional@pcpe.es pcpeinternacional@gmail.com'],
  'PCTE': ['Communist Party of the Workers of Spain', 'https://www.pcte.es', 'Spain', '/agency/pcte.png', 'international@pcte.es pcteinternational@gmail.com'],
  'C': ['Communists of Catalonia', 'https://www.comunistes.cat', 'Spain', '/agency/c.png', '(+34) 933184282 (+34) 933180011 internacional@comunistes.cat'],
  'CPSL': ['Communist Party of Sri-Lanka', 'http://www.communistpartyofsrilanka.org/', 'Sri-Lanka', '/agency/cpsl.png', '(+94) 112695328 (+94) 112691610 compartysl@gmail.com'],
  'SCP': ['Sudanese Communist Party', 'http://www.midan.net', 'Sudan', '/agency/scp.png', '(+42) 0233555668 (+42) 0233555668 ffadl.ham@gmail.com farididris@hotmail.com'],
  'CPS': ['Communist Party Of Swaziland', '', 'Swaziland', '/agency/cps.png', 'cpswa.org@gmail.com'],
  'SKPSE': ['Communist Party of Sweden', 'http://www.skp.se', 'Sweden', '/agency/skpse.png', '(+46) 87358640 skp@skp.se'],
  'SYCP': ['Syrian Communist Party', '', 'Syria', '/agency/sycp.png', '(+96) 3114455048 (+96) 3114422716 syriancommunistparty@gmail.com osamah.almaghout@gmail.com'],
  'SYRCP': ['Syrian Communist Party Unified', 'http://www.syrcomparty.org/', 'Syria', '/agency/syrcp.png', '(+96) 3114410264 (+96) 3114422383 scp.syria1@gmail.com scp@scparty-unified.com'],
  'KNT': ['Communist Party of Tadjikistan', 'http://www.kpt.freenet.tj', 'Tadjikistan', '/agency/knt.png', '(+992) 372232953 (+992) 372232853 (+992) 372351482 (+992) 372232292 lulush@mail.ru communist_party@mail.ru talbakov-555.@mail.ru'],
  'EMEP': ['Labour Party', 'http://www.emep.org', '', '/agency/emep.png', 'http://en.emep.org http://es.emep.org (+90) 5393281323 (+90) 2125875686 international@emep.org'],
  'USACP': ['Communist Party USA', 'http://www.cpusa.org', 'United States', '/agency/usacp.png', 'http://www.cpusa.org https://www.facebook.com/cpusa/ international@cpusa.org'],
  'KNY': ['Communist Party of Ukraine', 'http://www.kpu.life/', 'Ukraine', '/agency/kny.png', '(+38) 0442380506 (+38) 0442389986 (+38) 0442380506 (+38) 0442389986 cpu.inter.ukraine@gmail.com'],
  'CKY': ['Union of Communists of Ukraine', 'http://un-comm-ukr.ucoz.ru/', 'Ukraine', '/agency/cky.png', ''],
  'PCU': ['Communist Party of Uruguay', 'http://www.pcu.org.uy/', 'Uruguay', '/agency/pcu.png', '(+59) 829242697 (+59) 829247056 (+59) 829242697 (+59) 829247056 pcuinternacional@montevideo.com.uy partidocomunista@adinet.com.uy profdcoira@gmail.com info@pcu.org.uy'],
  'PCV': ['Communist Party of Venezuela', 'http://www.pcv-venezuela.org', 'Venezuela', '/agency/pcv.png', 'http://prensa-pcv.blogspot.com/ https://prensapcv.wordpress.com/ (+58) 2122566386 (+58) 2122566386 internacional.pcvenezuela@gmail.com carolus1111@yahoo.com'],
  'VCP': ['Communist Party of Vietnam', 'http://www.cpv.org.vn', 'Vietnam', '/agency/vcp.png', '(+844) 8436278 (+844) 8436278 (+844) 38234514 (+844) 8045657 IMCWP@cpvic.org.vn cpvic@cpvic.org.vn'],
 }

```

## 第二步我们通过伟大的人工（游戏）对应国旗和国名，填入对应国旗的png名称。。。

```markdown

```

## 第三步是从这个字典中取出数据，构建我们进行机构追踪的单个md文件。

```markdown
for key in agency :
    print(key)
    # key2 = str(key).replace('.', '-',5)
    # key2 = key2.replace(' ', '-', 5)
    # key2 = key2.replace('ô', 'o', 5)
    # key2= key2.rstrip('-')
    # key2 = key2.rstrip(' ')
    # key2 = key2.replace('--', '-')
    # print(key2)
    with open(path + "/" + key + '.md', "w", encoding="utf-8") as f:
        f.write("---\n\n")
        f.write("weight: 2\n\n")
        f.write("title: %s\n\n" %agency[key][0])
        f.write("author: %s\n\n" %key)
        f.write("authorLink: %s \n\n" %agency[key][1])
        f.write("countries: \n")
        f.write("- %s\n\n" %agency[key][2])
        f.write("tags: \n")
        f.write("- %s\n\n" %key)
        # f.write("type: %s\n\n" % key)
        #f.write("- %s-%s\n" % (year,imonth ))
        #f.write("- %s-%s-%s\n" % (year, imonth, idate))
        #f.write("- dailybrief\n")
        f.write("featuredImagePreview: '%s'\n\n" %agency[key][3])
        # f.write("toc: false \n\n")
        f.write("---\n\n")
        f.write("introduction of %s, " %key)
        f.write("%s简介 \n\n" %agency[key][0])
        f.write("<!--more-->\n\n")
        f.write("![flag](%s)" %agency[key][3])
        f.write("%s" % agency[key][4])
        f.close()

```


<p align="right">Communication from Bachelor.</p> 

