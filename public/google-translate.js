/* eslint-disable */
function GTranslateFireEvent(a, b) {
  try {
    if (document.createEvent) {
      var c = document.createEvent('HTMLEvents');
      c.initEvent(b, true, true);
      a.dispatchEvent(c);
    } else {
      var c = document.createEventObject();
      a.fireEvent('on' + b, c);
    }
  } catch (e) {}
}
function doGoogleLanguageTranslator(a) {
  if (a.value) a = a.value;

  if (a == '') return;
  var b = a.split('|')[1];
  var c;
  var d = document.getElementsByTagName('select');
  for (var i = 0; i < d.length; i++)
    if (d[i].className == 'goog-te-combo') c = d[i];

  const root = document.getElementById('root');
  console.log('root', root, 'c', c);
  let triedCount = 0;
  if (
    !root ||
    !root.innerHTML ||
    root.innerHTML.length == 0 ||
    c.length == 0 ||
    c.innerHTML.length == 0
  ) {
    setTimeout(function() {
      triedCount++;
      if (triedCount > 10) {
        return;
      }
      doGoogleLanguageTranslator(a);
    }, 100);
  } else {
    c.value = b;
    GTranslateFireEvent(c, 'change');
  }
}

function translateTo(fromTo) {
  try {
    console.log('Translate to ', fromTo);
    doGoogleLanguageTranslator(fromTo);
  } catch (err) {
    console.log('Translate error', err);
  }
}

function restoreTranslation() {
  try {
    const googleIframe = document.getElementById(':1.container');
    if (!googleIframe) {
      return;
    }
    const button = googleIframe.contentWindow.document.getElementById(
      ':1.close',
    );
    if (button) {
      button.click();
    }
  } catch (err) {
    console.log('Restore translation error', err);
  }
}
