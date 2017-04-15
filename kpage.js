function init(options){
var $ = function(a){return document.getElementById(a);};
var	$$ = function(a){return document.getElementsByClassName(a);};
var con = $$('page'),  //整个分页
	getNum = options.getNum|| function(){},
	maxNum = options.setNum||5;
var headstr = '<ul><li class="firstPage" id="firstPage">首页</li><li class="prePage" id="prePage">上一页</li>',
	endstr = '<li class="nextPage" id="nextPage">下一页</li><li class="lastPage" id="lastPage">末页</li></ul>',
	constr = '<li class="btnPage" style="background:blue;"><a href="#" class="btny">1</a></li>';
	for(var i=2;i<=maxNum;i++){
		constr+='<li class="btnPage"><a href="#" class="btny">'+i+'</a></li>';
	}
con[0].innerHTML = headstr+constr+endstr;
var initnum = 0,
	nowNum = null,
	 //一次最多展示几页
	npage = $('nextPage'), //下一页
	lpage = $('lastPage'),//最后一页 
	fpage = $('firstPage'), //首页
	ppage = $('prePage'),//上一页
	bpage = $$('btnPage'),//分页数字区
	bp = $$('btny');//页码	
con[0].addEventListener('click',function(ev){
	var event = ev;  //事件传入
	var tar = event.target; //获取事件源
	if(tar.className.toLowerCase()=='nextpage'){
		initnum++;	
		if(initnum==maxNum){
			initnum=0;
			for(var i=0;i<maxNum;i++){
				bp[i].innerHTML = parseInt(bp[i].innerHTML)+maxNum;
			}			
		}
		clearandcolor();		
		bpage[initnum].style.background = 'blue';
		nowNum=parseInt(bp[initnum].innerHTML);
		//console.log(nowNum);		
	}
	if(tar.className.toLowerCase()=='prepage'){
		initnum=initnum-1;
		if(initnum==-1){
			initnum=maxNum-1;
			if(parseInt(bp[0].innerHTML)>maxNum){
				for(var i=0;i<maxNum;i++){
				bp[i].innerHTML = parseInt(bp[i].innerHTML)-maxNum;
			}
		}						
		}
		clearandcolor ();
		bpage[initnum].style.background = 'blue';
		nowNum=parseInt(bp[initnum].innerHTML);
		//console.log(nowNum);			
	}
	if(tar.className.toLowerCase()=='firstpage'){
		initnum=0;
		for(var i=0;i<maxNum;i++){
			bpage[i].style.background = 'white';
			bp[i].innerHTML = i+1;
		}
		bpage[0].style.background = 'blue';
		nowNum=1;
		//console.log(nowNum);
	}
	if(tar.className.toLowerCase()=='btny'){
		clearandcolor ();
		var clicknum = parseInt(tar.innerHTML); //获取此时真实页码
		var tnum = clicknum%maxNum;	//除以5看余数	
		if(tnum==0){  //余数和伪页码的转换
			initnum=maxNum-1;
		}else{
			initnum=tnum-1;
		}
		bpage[initnum].style.background = 'blue';
		nowNum=parseInt(bp[initnum].innerHTML); //将真实页码传入全局变量
		//console.log(nowNum); 
	}
	getNum(nowNum);
});
//tools
function clearandcolor (){ //清楚所有页码的选中状态
	for(var i=0;i<maxNum;i++){
			bpage[i].style.background = 'white';
		}
}
}