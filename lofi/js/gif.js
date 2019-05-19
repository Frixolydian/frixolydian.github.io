var gifList = [
'https://thumbs.gfycat.com/AgedMiniatureBoto-max-1mb.gif',
'https://media1.tenor.com/images/a2113e5c802bb516a97cb2d3b9865018/tenor.gif?itemid=10442876',
'https://media1.tenor.com/images/3f0943f8c2416383efdebd9ef2b39489/tenor.gif?itemid=13362503',
'https://media1.tenor.com/images/164f2e709ee976d4bbe5dc83d93ed3ee/tenor.gif?itemid=13261028',
'https://media1.tenor.com/images/5339f619c504f2637ba48b55e7bda7ed/tenor.gif?itemid=13082107',
'https://media1.tenor.com/images/0762645563fb1e1469644c139b0ce455/tenor.gif?itemid=13784320',
'https://media1.tenor.com/images/d2ab277ea81f74104acd142d28ba8d21/tenor.gif?itemid=11974068',
'https://media1.tenor.com/images/d491a512d9d63ace8750d7d7723457c8/tenor.gif?itemid=9490273'
]

document.getElementById('gif').src= gifList[randomBetween(0, gifList.length - 1)];