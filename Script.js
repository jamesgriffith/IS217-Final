var FlickrPhoto = Backbone.Model.extend ({
	PhotoModel: function(){
	}
});

var FlickrPhotos = Backbone.Collection.extend({
	model: FlickrPhoto,
	FlickrPhotoCollection: function(){ 
	console.log('after the collection loads');
	}
});

var FlickrPhotoView = Backbone.View.extend ({
	// init view		
	GrabPhoto: function(){
		console.log('GrabPhoto');
	},	
	
	LoadImages: function(){
		var ShowImg = document.getElementById("ImageCarousel");

		for (var i = 1; i <= 10; i++){ var Img = document.createElement("img");
		Img.setAttribute("id");
		Img.setAttribute("style");
		var Storage = new FlickrPhoto({id: i});
		var PictureFrame = new FlickrPhotos([Storage]);
		ShowImg.appendChild(Img);
		} 
		}, 

	LoadApiImg: function(searchTerm){
		var Images = [];
		var search = searchTerm;
		var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ee78f78cac9824c29b1837f737726a3b&text=' + search + '&per_page=15&page=1&format=json&nojsoncallback=1';

		$.getJSON (url, function (data){
			$.each ( data.photos.photo, function (i, item) {
			var imgSrc = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + ".jpg";
			var photoURL = $(document.createElement('img')).attr({ id: 'Api'+ i }).attr("src", imgSrc).attr("width", "300px").appendTo("#FlickrPhotoRotator");
			//$("<img>").attr( { id: 'Api'+i, src: item.media.m } ).appendTo("#FlickrPhotoRotator");
			Images.push(imgSrc);
			console.log(Images);
			if (i === Images.length) { 
			return false; 
		};
	});
});
},

FlickrAnimation: function(){
	var MaxImages = 100; 
        var MinImages = 0;

setInterval(function (){ $("#Api"+MinImages).hide("fade", {}), 1000;
 	if (MinImages == MaxImages){
	MinImages = 0;
	}else{
	MinImages = MinImages + 1;
	}
}, 2000);
},

});

ImageRotator = new FlickrPhotoView;
Pic = new FlickrPhoto;
Pics = new FlickrPhotos;

ImageRotator.GrabPhoto();
Pic.PhotoModel();
Pics.FlickrPhotoCollection();
ImageRotator.LoadImages();
ImageRotator.LoadApiImg();
ImageRotator.FlickrAnimation();

$(document).ready(function(){
	$('#submit').click(function(){
	var searchTerm = $("input#term").val()
	});
});
