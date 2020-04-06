(function() {
  var overlay = null;
  var contentContainer = null;
  var qrcontainer = null;
  var captionTopContainer = null;
  var captionBottomContainer = null;

  function initQRCodeOverlay() {
    overlay = document.createElement('div');
    overlay.classList.add('qrcode-overlay');

    contentContainer = document.createElement('div');
    contentContainer.classList.add('qrcode-overlay-content');
    overlay.appendChild(contentContainer);

    captionTopContainer = document.createElement('div');
    captionTopContainer.classList.add('qrcode-overlay-caption-top');
    contentContainer.appendChild(captionTopContainer);

    qrcontainer = document.createElement('div');
    qrcontainer.classList.add('qrcode-overlay-code');
    contentContainer.appendChild(qrcontainer);

    captionBottomContainer = document.createElement('div');
    captionBottomContainer.classList.add('qrcode-overlay-caption-bottom');
    contentContainer.appendChild(captionBottomContainer);

    document.querySelector('body').appendChild(overlay);
  }

  function hideQRCodeOverlay() {
    if (overlay) {
      overlay.classList.remove('appearing');
      overlay.classList.remove('visible');
      document.removeEventListener('click', hideQRCodeOverlay);
    }
  }

  function showQRCodeOverlay(content, captionTop = null, captionBottom = null) {
    if (!overlay) {
      initQRCodeOverlay();
    }

    var qr = qrcode(0, 'L');
    qr.addData(content);
    qr.make();
    qrcontainer.innerHTML = qr.createSvgTag();

    captionTopContainer.innerHTML = captionTop || '';
    captionBottomContainer.innerHTML = captionBottom || '';

    overlay.classList.add('visible');
    setTimeout(function() {
      overlay.classList.add('appearing');
      document.addEventListener('click', hideQRCodeOverlay);
    }, 0);
  }

  function convertLinks(element) {
    element.querySelectorAll('.link-external').forEach(function (link) {
      link.addEventListener('click', function (ev) {
        var text = link.textContent;
        var url = link.getAttribute('href');
        showQRCodeOverlay(url, text, text !== url ? url : null);
        ev.preventDefault();
      });
    });
  }

  $(document).on(':passagerender', function (ev) {
    convertLinks(ev.content);
  });

  convertLinks(document);
})();
