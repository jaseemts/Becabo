/* ===========================================================
 *
 *  Searching for codes ? Alas, another geeky developer 
 *  looking out how well the codes are written, huh ?
 *  We at WowMakers Design Studio, always love to write neat codes.
 *  Finger-licking neat codes ! :)
 *
 *  Name:          main.js
 *  Created:       1-11-2011
 *  Updated by:    cooljaz124
 *
 *  Function:      Make the site work, with clean codes
 *
 *  www.wowmakers.com | WowMakers Design Studio, India
 * =========================================================== */
 
 
 $(document).ready(function(){
  
  // hides the necessary contents
  $('#profile-1, #profile-2, #profile-3, #profile-4, #profile-5, footer ul,#output-box aside, #output-box section, #sticky-footer').hide();
  
	
  // ===========================================================
	//  Highlight paragraph on image-story icon hover
	// ===========================================================
	
  $('.image-story a').live('hover',function(){
  	curDataStep = $(this).data('step');
  	$('.pStory em').has()
  	$('.pStory em').each(function(){
  		if ( $(this).data('step')	== curDataStep ) {
  			$(this).toggleClass('highlighted');
  		}
  	});
  },function(){
  	$('.pStory em').removeClass();
  });
  
  // ===========================================================
	//  Fetching needed data to be displayed in output-box
	// ===========================================================
	
  var pNum, profileID, pLinks, pCur, pPrevNext, pDet1, pDet2, pImageStory;
  function elemClone(aLink) {
    // fetch the data-pnum value
    pNum = aLink.data('pnum');
    
    // concatenate the pnum value to form #profile-(pnum)
    profileID = '#profile-'+pNum;
    
    pLinks = $(profileID + ' .pLinks ul');
    pStory = $(profileID + ' .pStory p');
    pCur = $(profileID + ' .pCur span');
    pPrevNext = $(profileID + ' .pPrevNext a');
    pDet1 = $(profileID + ' .pDet1 span');
    pDet2a = $(profileID + ' .pDet2-a a');
    pDet2b = $(profileID + ' .pDet2-b a');
    pImageStory = $(profileID + ' .image-story div');
    
    aLinkID = aLink.parent().parent().parent().attr('id');
    
    if ( aLinkID == 'people-list' ) {
      elemSelHome();
    }
    else {
      elemSelInner();
    }
  
  }
  
  // ===========================================================
	//  Animation sequence from Home Page
	// ===========================================================
	
	var lastLiClass, lastLiNum, imgStory, imgStoryClone, flag=0;
	
  function elemSelHome() {
    
    function seq1() {
      $('#sticky-footer .pCur').html(pCur.clone()).hide().fadeIn('fast');
    }
    
    function seq2() {
    	$('#output-box .pLinks').html(pLinks.clone()).hide().fadeIn('slow');
      $('#sticky-footer .pDet1').html(pDet1.clone()).hide().fadeIn('fast');
      $('#output-box .image-story a').hide();
    }
    
    function seq3() {
      imgStory = $('#output-box .image-story');
      imgStoryClone = imgStory.html(pImageStory.clone());
      
      imgStoryWidth = imgStoryClone.width();
      
      imgStoryClone
      	// .css({ width: imgStoryWidth })
      	.hide().fadeIn('slow');
      
      lastLiClass = $('#output-box ul.main-list > li:last-child a').attr('class');
    	lastLiNum = lastLiClass.split('-');
    	lastLiNum = lastLiNum[1];
    	
      clearInterval(myFade);
      fadeImageStory(lastLiNum,pStory);
    }
    
    function seq4(){
    	$('#sticky-footer .pDet2-a').html(pDet2a.clone());
      $('#sticky-footer .pDet2-b').html(pDet2b.clone());
      $('#sticky-footer .pDet2').hide().fadeIn('slow');
      $('#sticky-footer .pPrevNext').html(pPrevNext.clone()).hide().fadeIn('slow');
      $('footer ul').fadeIn('slow');
    }
    
    window.setTimeout( seq1 , 1250);
    window.setTimeout( seq2 , 2750);
    window.setTimeout( seq3 , 4000);
    window.setTimeout( seq4 , 6000);
  }
  
  
  // animation sequence from inner page links
  function elemSelInner() {
         
    $('#output-box .pLinks').html(pLinks.clone());
    $('#sticky-footer .pCur').html(pCur.clone());
    
    $('#sticky-footer .pDet1').html(pDet1.clone());
    
    $('#sticky-footer .pDet2-a').html(pDet2a.clone());
    $('#sticky-footer .pDet2-b').html(pDet2b.clone());
    $('#sticky-footer .pDet2').hide().show();
    
    imgStory = $('#output-box .image-story');
    imgStoryClone = imgStory.html(pImageStory.clone());
    
    imgStoryWidth = imgStoryClone.width();
    
    imgStoryClone
    	// .css({ width: imgStoryWidth })
    	.hide().fadeIn('slow');
      	
    $('#sticky-footer .pPrevNext').html(pPrevNext.clone());
    
    $('#output-box .pStory').html(pStory.clone());
    
    lastLiClass = $('#output-box ul.main-list > li:last-child a').attr('class');
    lastLiNum = lastLiClass.split('-');
    lastLiNum = lastLiNum[1];
    
    clearInterval(myFade);
    fadeImageStory(lastLiNum);
    
  }
  
  // ===========================================================
	//  Animation effect to start from clicking Home Page links
	// ===========================================================
	
  $('#people-list a').click(function(e){
    $('#people-list').hide();
    $('#output-box aside, #output-box section, #sticky-footer').show();
    $('#output-box, body, #sticky-footer').addClass(($(this).attr('class')));
    
    // runs the elemClone function
    elemClone($(this));    
    
    e.preventDefault();
  });
  
  // ===========================================================
	//  Animation effect to start from clicking Inner Page links
	// ===========================================================
	
  $('#output-box .pLinks a, #sticky-footer .pPrevNext a').live('click', function(e) {
    
    // prevents loading the content again if you click the active people link
    if($(this).hasClass('active')||$(this).hasClass('inactive')){
       return false;
    }
    // remove active class from all other siblings
    if($(this).siblings().hasClass('active')){
      $(this).removeClass('active');
    }
    
    // clears any class from outputbox
    $('#output-box,body,#sticky-footer').removeClass();
    
    // if clicked link is the prevNext link
    if($(this).parent().hasClass('pPrevNext')) {
    	$('#output-box,body,#sticky-footer').addClass('people-'+($(this).attr('data-pnum')));
    }
    // else if clicked link is the small-people link
    else {
    	$('#output-box,body,#sticky-footer').addClass(($(this).attr('class')));
    }
    
    // adds an active class
    $(this).addClass('active');
    
    // runs the elemClone function, obviously
    elemClone($(this));
    
    e.preventDefault();
  });
  
  // ===========================================================
	//  Image-Story ul li Fade Animation
	// ===========================================================
	
  var myFade;
  function fadeImageStory(liNum,pStoryDiv) {
  	var step = 1;
    var delay = 300;
    var total = parseInt(liNum);
    total = total+1;
    
    function autoFadeIn() {
    	fadeIn();
      step++;
      if(step === total) {
      	clearInterval(myFade);
      	$('#output-box .pStory').html(pStoryDiv.clone()).hide().fadeIn('fast');
      }
    }
      
    $('#output-box .image-story a').hide();
    
    function fadeIn() {
    	$('#output-box .step-' + step).fadeIn(delay);
    }
    
    myFade = setInterval(autoFadeIn, delay);
	}
  
});