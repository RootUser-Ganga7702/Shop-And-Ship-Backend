const bwipjs = require('bwip-js');
const QRCode = require('qrcode');

exports.generateBarcodeBase64= (productId)=> {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer({
      bcid: 'code128',
      text: productId,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: 'center',
    }, function (err, png) {
      if (err) return reject(err);
      const base64 = `data:image/png;base64,${png.toString('base64')}`;
      resolve(base64);
    });
  });
}

exports.generateQRCodeBase64 = async (orderId)=> {
  try {
    const qrData = `${orderId}`;
    const base64 = await QRCode.toDataURL(qrData);
    return base64; // already in "data:image/png;base64,..." format
  } catch (err) {
    console.error('QR Code generation error:', err);
    return '';
  }
}
