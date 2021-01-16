//ubdate photo

// let form=document.querySelector("#changePhoto");
// let fileInput=document.querySelector("#file");
// let myImg=document.querySelector("#myImage");

let form=document.querySelector("#changePhoto")
let file=document.querySelector("#file")
let img=document.querySelector("#myImage")


form.addEventListener("change", function (){
	//էջը չի թարմանցվում
	//e.preventDefault();
	console.log(file.files)
	//file.files տալիս է array ընտրված նկարների url-ներից
	let url=URL.createObjectURL(file.files[0])
	img.src=url


})

    