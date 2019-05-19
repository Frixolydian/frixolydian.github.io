var gifList = [
'https://thumbs.gfycat.com/AgedMiniatureBoto-max-1mb.gif',
'https://media1.tenor.com/images/a2113e5c802bb516a97cb2d3b9865018/tenor.gif?itemid=10442876',
'https://media1.tenor.com/images/3f0943f8c2416383efdebd9ef2b39489/tenor.gif?itemid=13362503',
'https://media1.tenor.com/images/164f2e709ee976d4bbe5dc83d93ed3ee/tenor.gif?itemid=13261028',
'https://media1.tenor.com/images/5339f619c504f2637ba48b55e7bda7ed/tenor.gif?itemid=13082107',
'https://media1.tenor.com/images/0762645563fb1e1469644c139b0ce455/tenor.gif?itemid=13784320',
'https://media1.tenor.com/images/d2ab277ea81f74104acd142d28ba8d21/tenor.gif?itemid=11974068',
'https://media1.tenor.com/images/d491a512d9d63ace8750d7d7723457c8/tenor.gif?itemid=9490273',
'https://i.makeagif.com/media/1-13-2018/KIlkcL.gif',
'https://media1.tenor.com/images/3858f9b791b3d00b871043d32892e0c1/tenor.gif?itemid=11805013',
'https://media1.tenor.com/images/bf5c091558cad114ab73485814d9c1bc/tenor.gif?itemid=5484757',
'https://media.tenor.com/images/77c8642435cf0585f80a9f488a5516e0/tenor.gif',
'https://media1.tenor.com/images/622431b9aafb96fda136a503f9508e66/tenor.gif?itemid=10932378',
''
]

document.getElementById('gif').src= gifList[randomBetween(0, gifList.length - 1)];