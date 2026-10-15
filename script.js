(function () {
  var STYLES = {
    builder: { name: "Builder's Grade", price: 49, rim: 52, rt: 44, hinge: 'plastic', cushion: false, tabs: false, grooves: false,
      desc: 'Molded plastic, standard hinges and bumpers. The no-fuss replacement for the seat that came with the house.' },
    glacier: { name: 'Glacier Bay-style', price: 69, rim: 50, rt: 48, hinge: 'plastic', cushion: false, tabs: false, grooves: true, damper: true,
      desc: 'Value-priced soft-close with a rounded back edge and a clean, moderate profile.' },
    delta: { name: 'Delta-style', price: 79, rim: 44, rt: 26, hinge: 'chrome', cushion: false, tabs: false, grooves: true,
      desc: 'Slim, contoured modern profile with chrome slow-close hinges and a quick-release mount.' },
    kohler: { name: 'Kohler-style', price: 99, rim: 57, rt: 34, hinge: 'chrome', cushion: false, tabs: true, grooves: true,
      desc: 'Wider, sculpted rim with quiet-close hinges and side-button quick release for easy cleaning.' },
    comfort: { name: 'Comfort Plus', price: 119, rim: 62, rt: 50, hinge: 'chrome', cushion: true, tabs: true, grooves: false,
      desc: 'Extra-wide padded cushion in wipe-clean vinyl with soft-close chrome hinges.' }
  };
  var COLORS = {
    white: ['White', '#f7f7f4'], bone: ['Bone', '#ece4d0'], biscuit: ['Biscuit', '#e3d2b0'], almond: ['Almond', '#efdfca'],
    linen: ['Linen', '#e4dccd'], mist: ['Mist Gray', '#a9b0b3'], graphite: ['Graphite', '#4d5156'], black: ['Black', '#232427']
  };
  var SHAPES = { elongated: ['Elongated', 400, 175], round: ['Round', 345, 150] };

  function hex(c) { return [1, 3, 5].map(function (i) { return parseInt(c.substr(i, 2), 16); }); }
  function mix(c, t, a) {
    var r = hex(c), q = hex(t);
    return '#' + r.map(function (v, i) { var x = Math.round(v + (q[i] - v) * a); return (x < 16 ? '0' : '') + x.toString(16); }).join('');
  }
  var uid = 0;

  function ringPath(x0, y0, x1, y1, rt, ry) {
    var w = (x1 - x0) / 2, ym = y1 - ry;
    return 'M' + (x0 + rt) + ' ' + y0 + 'H' + (x1 - rt) + 'Q' + x1 + ' ' + y0 + ' ' + x1 + ' ' + (y0 + rt) +
      'V' + ym + 'A' + w + ' ' + ry + ' 0 0 1 ' + x0 + ' ' + ym + 'V' + (y0 + rt) + 'Q' + x0 + ' ' + y0 + ' ' + (x0 + rt) + ' ' + y0 + 'Z';
  }

  function seatBody(o) {
    var s = STYLES[o.style], sh = SHAPES[o.shape], base = COLORS[o.color][1], id = 's' + (++uid);
    var x0 = 50, x1 = 350, y0 = 70, y1 = y0 + sh[1], ry = sh[2];
    var dark = mix(base, '#000000', .28), light = mix(base, '#ffffff', .55), mid = mix(base, '#000000', .1);
    var rim = s.rim, ix0 = x0 + rim, ix1 = x1 - rim, iy0 = y0 + rim + 22, iy1 = y1 - rim;
    var iry = (ix1 - ix0) / 2 * (ry / 150) * 0.97;
    var outer = ringPath(x0, y0, x1, y1, s.rt, ry), inner = ringPath(ix0, iy0, ix1, iy1, Math.max(s.rt - 10, 16), iry);
    var cx = 200, wy = iy1 - iry * .9;
    var o2 = '';
    o2 += '<defs>' +
      '<linearGradient id="' + id + 'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + light + '"/><stop offset=".45" stop-color="' + base + '"/><stop offset="1" stop-color="' + dark + '"/></linearGradient>' +
      '<radialGradient id="' + id + 'b" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#f4f7f8"/><stop offset="1" stop-color="#b9c4c9"/></radialGradient>' +
      '<radialGradient id="' + id + 'w" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#9fc3cf"/><stop offset="1" stop-color="#4f7684"/></radialGradient>' +
      '<linearGradient id="' + id + 'c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#9aa3a8"/></linearGradient>' +
      '<filter id="' + id + 'sh" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>' +
      '<filter id="' + id + 'bl"><feGaussianBlur stdDeviation="2.4"/></filter>' +
      '<clipPath id="' + id + 'k"><path fill-rule="evenodd" d="' + outer + inner + '"/></clipPath></defs>';
    o2 += '<path d="' + outer + '" transform="translate(6 14)" fill="#000" opacity=".28" filter="url(#' + id + 'sh)"/>';
    // bowl visible through the opening
    o2 += '<path d="' + ringPath(ix0 - 4, iy0 - 4, ix1 + 4, iy1 + 4, s.rt, iry + 4) + '" fill="url(#' + id + 'b)"/>';
    o2 += '<ellipse cx="' + cx + '" cy="' + (wy + 18) + '" rx="' + ((ix1 - ix0) * .27) + '" ry="' + (iry * .55) + '" fill="url(#' + id + 'w)"/>';
    o2 += '<ellipse cx="' + (cx - 20) + '" cy="' + (wy + 2) + '" rx="26" ry="7" fill="#fff" opacity=".35"/>';
    // seat ring
    o2 += '<path fill-rule="evenodd" d="' + outer + inner + '" fill="url(#' + id + 'g)"/>';
    o2 += '<g clip-path="url(#' + id + 'k)">' +
      '<path d="' + outer + '" fill="none" stroke="' + dark + '" stroke-width="10" opacity=".55"/>' +
      '<path d="' + inner + '" fill="none" stroke="' + dark + '" stroke-width="14" opacity=".5" filter="url(#' + id + 'bl)"/>' +
      '<path d="' + outer + '" fill="none" stroke="' + light + '" stroke-width="3" transform="translate(-2 -2)" opacity=".8"/>' +
      '<ellipse cx="150" cy="' + (y0 + 40) + '" rx="95" ry="14" fill="#fff" opacity=".35" filter="url(#' + id + 'bl)"/>' +
      '</g>';
    o2 += '<path d="' + inner + '" fill="none" stroke="' + dark + '" stroke-width="1.5" opacity=".7"/>';
    if (s.cushion) {
      var cr = 14;
      o2 += '<path d="' + ringPath(x0 + cr, y0 + cr, x1 - cr, y1 - cr, s.rt - 8, ry - cr) + '" fill="none" stroke="' + light + '" stroke-width="2" opacity=".7"/>';
      o2 += '<path d="' + ringPath(x0 + cr + 6, y0 + cr + 6, x1 - cr - 6, y1 - cr - 6, s.rt - 10, ry - cr - 6) + '" fill="none" stroke="' + dark + '" stroke-width="1.6" stroke-dasharray="5 4" opacity=".6"/>';
    } else if (s.grooves) {
      o2 += '<path d="' + ringPath(x0 + 14, y0 + 14, x1 - 14, y1 - 14, Math.max(s.rt - 12, 12), ry - 14) + '" fill="none" stroke="' + dark + '" stroke-width="1.2" opacity=".35"/>';
    }
    // hinges
    var hc = s.hinge === 'chrome';
    [112, 288].forEach(function (hx) {
      o2 += '<rect x="' + (hx - 20) + '" y="' + (y0 - 30) + '" width="40" height="44" rx="8" fill="' + (hc ? 'url(#' + id + 'c)' : mid) + '" stroke="' + (hc ? '#6d767b' : dark) + '" stroke-width="1.5"/>';
      o2 += '<rect x="' + (hx - 9) + '" y="' + (y0 - 22) + '" width="18" height="8" rx="4" fill="' + (hc ? '#cfd6d9' : dark) + '" opacity=".8"/>';
      o2 += '<rect x="' + (hx - 22) + '" y="' + (y0 + 6) + '" width="44" height="14" rx="4" fill="' + base + '" stroke="' + dark + '" stroke-width="1.2"/>';
    });
    if (s.damper) o2 += '<rect x="180" y="' + (y0 - 24) + '" width="40" height="22" rx="4" fill="' + mid + '" stroke="' + dark + '" stroke-width="1.2"/>';
    if (s.tabs) [x0 + 3, x1 - 9].forEach(function (tx) {
      o2 += '<rect x="' + tx + '" y="' + (y0 + 36) + '" width="6" height="30" rx="3" fill="' + dark + '" opacity=".55"/>';
    });
    o2 += '<circle cx="152" cy="' + (y0 - 8) + '" r="3.5" fill="#e8892b"/><circle cx="152" cy="' + (y0 - 8) + '" r="7" fill="#e8892b" opacity=".25"/>';
    // bumpers
    [ix0 + 8, ix1 - 8].forEach(function (bx) {
      o2 += '<circle cx="' + bx + '" cy="' + (y1 - ry - 6) + '" r="7" fill="#2b2c2e" opacity=".85"/>';
    });
    return o2;
  }

  function seatSVG(o) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 ' + (o.shape === 'round' ? 495 : 550) + '" focusable="false" aria-hidden="true">' + seatBody(o) + '</svg>';
  }

  function anatomySVG(o) {
    var c = [['Soft-close chrome hinge', 112, 62, 520, 70], ['USB-C + status LED', 152, 62, 520, 140], ['Quick-release tabs', 54, 140, 520, 250], ['Padded wipe-clean cushion', 330, 260, 520, 340]];
    var t = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 550" focusable="false" aria-hidden="true"><g>' + seatBody(o) + '</g>';
    c.forEach(function (l) {
      t += '<path d="M' + l[1] + ' ' + l[2] + 'L' + (l[1] + 60) + ' ' + l[4] + 'H' + (l[3] - 10) + '" stroke="#f5b061" stroke-width="2" fill="none"/>' +
        '<circle cx="' + l[1] + '" cy="' + l[2] + '" r="4" fill="#f5b061"/>' +
        '<text x="' + (l[3] - 4) + '" y="' + (l[4] + 5) + '" fill="#f7f1e3" font-family="system-ui,sans-serif" font-size="15">' + l[0] + '</text>';
    });
    return t + '</svg>';
  }

  var state = { shape: 'elongated', style: 'comfort', color: 'white' };
  var $ = function (id) { return document.getElementById(id); };

  function btn(group, key, label, cls) {
    return '<button type="button" class="' + (cls || 'opt') + '" data-g="' + group + '" data-k="' + key + '" aria-pressed="false">' + label + '</button>';
  }
  function build() {
    $('opt-shape').innerHTML = Object.keys(SHAPES).map(function (k) { return btn('shape', k, SHAPES[k][0]); }).join('');
    $('opt-style').innerHTML = Object.keys(STYLES).map(function (k) { return btn('style', k, STYLES[k].name); }).join('');
    $('opt-color').innerHTML = Object.keys(COLORS).map(function (k) {
      return '<button type="button" class="sw" data-g="color" data-k="' + k + '" aria-pressed="false" aria-label="' + COLORS[k][0] + '" title="' + COLORS[k][0] + '" style="--c:' + COLORS[k][1] + '"></button>';
    }).join('');
    $('style-grid').innerHTML = Object.keys(STYLES).map(function (k) {
      var s = STYLES[k];
      return '<article class="tier"><div class="tier-img">' + seatSVG({ shape: 'elongated', style: k, color: 'bone' }) + '</div><h3>' + s.name + '</h3>' +
        '<p class="price">From $' + s.price + '</p><p>' + s.desc + '</p>' +
        '<button type="button" class="btn btn-ghost" data-pick="' + k + '">Preview this style</button></article>';
    }).join('');
    $('hero-seat').innerHTML = seatSVG({ shape: 'elongated', style: 'delta', color: 'white' });
    $('anatomy-seat').innerHTML = anatomySVG({ shape: 'elongated', style: 'comfort', color: 'biscuit' });
  }
  function render() {
    $('config-seat').innerHTML = seatSVG(state);
    var s = STYLES[state.style];
    $('config-seat').setAttribute('aria-label', COLORS[state.color][0] + ' ' + SHAPES[state.shape][0].toLowerCase() + ' ' + s.name + ' seat, top view');
    $('config-name').textContent = s.name + ' · ' + SHAPES[state.shape][0] + ' · ' + COLORS[state.color][0];
    $('style-desc').textContent = s.desc;
    $('config-price').textContent = '$' + (s.price + (state.shape === 'elongated' ? 6 : 0)) + ' target price';
    document.querySelectorAll('[data-g]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(state[b.getAttribute('data-g')] === b.getAttribute('data-k')));
    });
  }

  build(); render();
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-g],[data-pick]');
    if (!b) return;
    if (b.hasAttribute('data-pick')) {
      state.style = b.getAttribute('data-pick');
      render();
      $('configurator').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    } else { state[b.getAttribute('data-g')] = b.getAttribute('data-k'); render(); }
  });
})();
