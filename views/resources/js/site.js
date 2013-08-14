function nextclass_clickHandler(){
	ga('send', 'event', 'Next Class', 'click');
	return true;
}

function folder_clickHandler(){
	ga('send', 'event', 'Show Folder', 'click');
	return true;
}

function highgate_clickHandler(){
	ga('send', 'event', 'Show Highgate', 'click');
	window.open('https://maps.google.com/maps?q=49+Gladstone+Road,+Highgate+Hill,+Queensland,+Australia&hl=en&ll=-27.485015,153.019692&spn=0.001673,0.00327&sll=-27.48485,153.020175&sspn=0.006653,0.013078&hnear=49+Gladstone+Rd,+Highgate+Hill+Queensland+4101,+Australia&t=m&z=19','_blank');
	return true;
}

function merthyr_clickHandler(){
	ga('send', 'event', 'Show Merthyr', 'click');
	window.open('https://maps.google.com/maps?q=loc:+-27.475332,153.045607&hl=en&ll=-27.474818,153.044497&spn=0.003327,0.006539&sll=35.487895,-87.332414&sspn=0.006106,0.013078&t=m&z=18','_blank');
	return true;
}

(function configureDates(){
	var dateContainer =null;
	var locationContainer=null;
	var hrefContainer=null;
	var dayReference=null;
	
	var linkMerthyrPark = 'https://maps.google.com/maps?q=loc:+-27.475332,153.045607&hl=en&ll=-27.474818,153.044497&spn=0.003327,0.006539&sll=35.487895,-87.332414&sspn=0.006106,0.013078&t=m&z=18';
	var linkHighgate = 'https://maps.google.com/maps?q=49+Gladstone+Road,+Highgate+Hill,+Queensland,+Australia&hl=en&ll=-27.485015,153.019692&spn=0.001673,0.00327&sll=-27.48485,153.020175&sspn=0.006653,0.013078&hnear=49+Gladstone+Rd,+Highgate+Hill+Queensland+4101,+Australia&t=m&z=19'
	function init(){
		datecontainer = document.getElementById('nextclass_date');		
		locationContainer = document.getElementById('nextclass_location');		
		hrefContainer = document.getElementById('nextclass_url');		
		dayReference = document.getElementById('day_ref');
		var now = new Date();
		
		var nextWednesday = new Date();
		var diffDays = Math.abs(now.getDay()-3);		
		if(now.getDay()>3)diffDays=(7-diffDays);
		if(nextWednesday.getDay()!=3)nextWednesday.setDate(now.getDate()+diffDays);	
		datecontainer.innerHTML=buildStringFromDate(nextWednesday);
		
		if(isAfternoonClass(now)){
			hrefContainer.href=linkHighgate;
			locationContainer.innerHTML='Highgate Hill';			
		}else{
			hrefContainer.href=linkMerthyrPark;
			locationContainer.innerHTML='Merthyr Park'
		}
		var dayref_inner=' this Wednesday';
		switch(now.getDay()){
			case 2:
				dayref_inner='tomorrow';
				break;
			case 3:
				dayref_inner='today';
				break;
			case 4:
			case 5:
			case 6:
				dayref_inner='next week';
				break;
		}
		dayReference.innerHTML=' '+dayref_inner;
	}
	
	function buildStringFromDate(d){
		var months=["January","February","March","April","May","June","July","August","Oktober","November","December"];
		var postfixes=['th','st','nd','rd']
		var dayOfMonth = d.getDate();
		var dayOfWeek=d.getDay();
		var day_postFix = postfixes[0];
		if(dayOfMonth<=3)postFix = postfixes[dayOfMonth];
		
		var timeStr = (isAfternoonClass())?"06:30PM":"10:00AM";
		var dString = dayOfMonth+day_postFix+" of "+months[d.getMonth()]+" "+timeStr;
		
		return dString;
	}
	
	function isAfternoonClass(){	
		var d = new Date();
		return d.getHours()>=10 && d.getDay()==3;
	}
	//init(); automatic dating is suspended for now
})();

(function configureReadMore(){

	var block_paragraphMap={};
	var readmore_blockMap={};
	
	var readMore_txt="More<span class='icon-angle-double-down'></span>";
	var readLess_txt="Less<span class='icon-angle-double-up'></span>";
	
	function init(){
	
		addReadmoreToID('block1');
		addReadmoreToID('block2');
		//addReadmoreToID('block3');
		
		window.onresize=function(){
			sizeToParagraph(document.getElementById('block1'));
			sizeToParagraph(document.getElementById('block2'));
			sizeToParagraph(document.getElementById('block3'));
		}
	}

	function addReadmoreToID(id){
		var block = document.getElementById(id);
		var ptags = block.getElementsByTagName('p');
		if(ptags.length<=1)return;	
		
		var pToSelect = getFirstReadParagraph(id);
		block_paragraphMap[id] = pToSelect;
		
		
		var readMore = document.createElement('a');
		readMore.href='#';
		readMore.id='readmore_'+id;
		readmore_blockMap[readMore.id] = block;
		readMore.innerHTML=readMore_txt;
		readMore.className='read_more blue_link';
		pToSelect.appendChild(readMore);
		
		readMore.onclick=readmore_clickHandler;
		sizeToParagraph(block);
		
	}
	
	function readmore_clickHandler(e){		
		var readMoreElement =this;//(e.currentTarget)?e.currentTarget:this;
		var block = readmore_blockMap[readMoreElement.id];
				
		ga('send', 'event', 'Read More', 'click', block.id+'');
		
		var currentClass = readMoreElement.className;
		if(currentClass.indexOf("read_more")>-1){
			
			readMoreElement.className="read_less blue_link";
			readMoreElement.innerHTML=readLess_txt;	
			var lastPara = getLastParagraph(block.id);
			lastPara.appendChild(readMoreElement);
			block.style.height='100%';
			block_paragraphMap[block.id] = lastPara;
			sizeToParagraph(block);
		}else{
			readMoreElement.className="read_more blue_link";
			readMoreElement.innerHTML=readMore_txt;	
			var firstPara = getFirstReadParagraph(block.id)
			firstPara.appendChild(readMoreElement);
			block_paragraphMap[block.id] = firstPara;
			sizeToParagraph(block);
		}
		
		return false;
	}
	
	function getFirstReadParagraph(blockID){
		var block = document.getElementById(blockID);
		var ptags = block.getElementsByTagName('p');		
		var pIndex = 0;
		try{
			pIndex=parseInt(block.attributes['data-paragraph'].value);
		}catch(e){}
		
		return ptags[pIndex];
	}
	
	function getLastParagraph(blockID){
		var block = document.getElementById(blockID);
		var ptags = block.getElementsByTagName('p');
		return ptags[ptags.length-1];
	}
	
	function sizeToParagraph(block,par){
		var paragraph = block_paragraphMap[block.id];
		if(!paragraph)paragraph = getFirstReadParagraph(block.id);
		var offset = paragraph.getBoundingClientRect().bottom - block.getBoundingClientRect().top;//pToSelect.offsetHeight+pToSelect.offsetTop;
		block.style.height=offset+'px';
	}
	
	function resetBlockContent(id){		
		if(originalBlockContent[id]){
			var block = document.getElementById(id);
			block.innerHTML = originalBlockContent[id];
		}
	}

	init();
})();
