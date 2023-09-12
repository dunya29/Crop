
    window.addEventListener('DOMContentLoaded', function () {
       const widthInp = document.querySelector(".size--w input")
       const heightInp = document.querySelector(".size--h input")
       let widthInpVal = widthInp.getAttribute("data-value")
       let heightInpVal = heightInp.getAttribute("data-value")
       const priceVal = document.querySelector("#good-price").value
       const area = document.querySelector("#good-area")
       const total = document.querySelector("#good-total")
       const priceTxt = document.querySelector("#good-price-text")
       const areaTxt = document.querySelector("#good-area-text")
       const totalTxt = document.querySelector("#good-total-text")
       document.querySelectorAll(".size input").forEach(inp => {
        inp.value = parseFloat(Number(inp.getAttribute("data-value"))).toFixed(1)
    })
       function setData() {
          priceTxt.textContent = String(priceVal).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
          let areaVal = (widthInp.value * heightInp.value)/10000
          area.value = areaVal.toFixed(3)
          areaTxt.textContent = areaVal.toFixed(2)
          let totalVal = areaVal < 1 ? 1 * priceVal : Math.round(areaVal * priceVal) 
          total.value = totalVal
          totalTxt.textContent = String(totalVal).replace(/\B(?=(\d{3})+(?!\d))/g, " ").trim()
       }
       setData()
        const image = document.querySelector('#image');
        const button = document.getElementById('button');
        const result = document.getElementById('result');
        const cropper = new Cropper(image, {
            viewMode: 2,
	  	    ovable: false,
	  	    oomable: false,
            rotatable: false,
            //cropBoxMovable: false,
            autoCropArea: 1,
            dragMode: "none",
            ready: function (event) {
              // Zoom the image to its natural size
              cropper.zoomTo(1);
            },
            crop: function (event) {
                let w = (Math.ceil(cropper.cropBoxData.width) /  cropper.containerData.width) * 100
                let h = (Math.ceil(cropper.cropBoxData.height) / cropper.containerData.height) * 100
                document.querySelector(".size--w input").value = parseFloat(Math.round(widthInpVal * w / 100)).toFixed(1)
                document.querySelector(".size--h input").value = parseFloat(Math.round(heightInpVal * h / 100)).toFixed(1)
                setData()
            },
            zoom: function (event) {
              // Keep the image in its natural size
              if (event.detail.oldRatio === 1) {
                event.preventDefault();
              }
            }, 
        });
        document.querySelectorAll(".size input").forEach(inp => {
            inp.addEventListener("change", () => {
                let val = inp.value.indexOf('.') > 0 ? Number(String(Math.round(inp.value)).substring(0,inp.value.indexOf('.'))) : Math.round(inp.value) 
                inp.value = val > inp.max ? parseFloat(inp.max).toFixed(1)  : parseFloat(val).toFixed(1) 
                let dataW = parseInt(document.querySelector(".size--w input").value)//(Number(String(document.querySelector(".size--w input").value).replace(/[^0-9]/g,""))) / 10
                let dataH = parseInt(document.querySelector(".size--h input").value)
                let wPercent = dataW /  widthInpVal * 100
                let hpercent = dataH / heightInpVal * 100
                let data = {
                    left: (cropper.containerData.width - cropper.containerData.width * wPercent / 100) / 2,
                    top: (cropper.containerData.height - cropper.containerData.height * hpercent / 100) / 2,
                    width: cropper.containerData.width * wPercent / 100,
                    height: cropper.containerData.height * hpercent / 100,
                }
                cropper.setCropBoxData(data)
            })
        })
        button.onclick = function () {
          result.innerHTML = '';
          result.appendChild(cropper.getCroppedCanvas());
        };
    });