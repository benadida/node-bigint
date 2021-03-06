var assert = require('assert');
var bigint = require('../');

exports.create = function () {
    assert.eql(bigint(1337).toString(), '1337');
    assert.eql(bigint('1337').toString(), '1337');
    assert.eql(new bigint('100').toString(), '100');
    assert.eql(
        new bigint('55555555555555555555555555').toString(),
        '55555555555555555555555555'
    );
    
    assert.eql(Number(bigint('1e+100').toString()), 1e+100);
    assert.eql(Number(bigint('1.23e+45').toString()), 1.23e+45);
    for (var i = 0; i < 10; i++) {
        assert.eql(
            bigint('1.23456e+' + i).toString(),
            Math.floor(1.23456 * Math.pow(10,i))
        );
    }
    
    assert.eql(bigint('1.23e-45').toString(), '0');

    assert.throws(function() { bigint(undefined); });
    assert.throws(function() { bigint(null); });
};

exports.add = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = (i + j).toString();
            assert.eql(bigint(i).add(j).toString(), ks);
            assert.eql(bigint(i).add(js).toString(), ks);
            assert.eql(bigint(i).add(bigint(j)).toString(), ks);
            assert.eql(bigint.add(i, j).toString(), ks);
        }
    }
    
    assert.eql(
        bigint(
            '201781752444966478956292456789265633588628356858680927185287861892'
            + '9889675589272409635031813235465496971529430565627918846694860512'
            + '1492948268400884893722767401972695174353441'
        ).add(
            '939769862972759638577945343130228368606420083646071622223953046277'
            + '3784500359975110887672142614667937014937371109558223563373329424'
            + '0624814097369771481147215472578762824607080'
        ).toString(),
        '1141551615417726117534237799919494002195048440504752549409240908170367'
        + '41759492475205227039558501334339864668016751861424100681899362117762'
        + '365770656374869982874551457998960521'
    );
};

exports.sub = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = (i - j).toString();
            assert.eql(bigint(i).sub(j).toString(), ks);
            assert.eql(bigint(i).sub(js).toString(), ks);
            assert.eql(bigint(i).sub(bigint(j)).toString(), ks);
            assert.eql(bigint.sub(i, j).toString(), ks);
        }
    }
    
    assert.eql(
        bigint(
            '635849762218952604062459342660379446997761295162166888134051068531'
            + '9813941775949841573516110003093332652267534768664621969514455380'
            + '8051168706779408804756208386011014197185296'
        ).sub(
            '757617343536280696839135295661092954931163607913400460585109207644'
            + '7966483882748233585856350085641718822741649072106343655764769889'
            + '6399869016678013515043471880323279258685478'
        ).toString(),
        '-121767581317328092776675953000713507933402312751233572451058139112815'
        + '25421067983920123402400825483861704741143034417216862503145088348700'
        + '309898604710287263494312265061500182'
    );
};

exports.mul = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = (i * j).toString();
            assert.eql(bigint(i).mul(j).toString(), ks);
            assert.eql(bigint(i).mul(js).toString(), ks);
            assert.eql(bigint(i).mul(bigint(j)).toString(), ks);
            assert.eql(bigint.mul(i, j).toString(), ks);
        }
    }
    
    assert.eql(
        bigint(
            '433593290010590489671135819286259593426549306666324008679782084292'
            + '2446494189019075159822930571858728009485237489829138626896756141'
            + '8738958337632249177044975686477011571044266'
        ).mul(
            '127790264841901718791915669264129510947625523373763053776083279450'
            + '3886212911067061184379695097643279217271150419129022856601771338'
            + '794256383410400076210073482253089544155377'
        ).toString(),
        '5540900136412485758752141142221047463857522755277604708501015732755989'
        + '17659432099233635577634197309727815375309484297883528869192732141328'
        + '99346769031695550850320602049507618052164677667378189154076988316301'
        + '23719953859959804490669091769150047414629675184805332001182298088891'
        + '58079529848220802017396422115936618644438110463469902675126288489182'
        + '82'
    );
    
    assert.eql(
        bigint('10000000000000000000000000000').mul(-123).toString(),
        '-1230000000000000000000000000000'
    );
};

exports.div = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = Math.floor(i / j).toString();
            if (ks.match(/^-?\d+$/)) { // ignore exceptions
                assert.eql(bigint(i).div(j).toString(), ks);
                assert.eql(bigint(i).div(js).toString(), ks);
                assert.eql(bigint(i).div(bigint(j)).toString(), ks);
                assert.eql(bigint.div(i, j).toString(), ks);
            }
        }
    }
    
    assert.eql(
        bigint(
            '433593290010590489671135819286259593426549306666324008679782084292'
            + '2446494189019075159822930571858728009485237489829138626896756141'
            + '8738958337632249177044975686477011571044266'
        ).div(
            '127790264841901718791915669264129510947625523373763053776083279450'
            + '3886212911067061184379695097643279217271150419129022856601771338'
            + '794256383410400076210073482253089544155377'
        ).toString(),
        '33'
    );
};

exports.abs = function () {
    assert.eql(
        bigint(
            '433593290010590489671135819286259593426549306666324008679782084292'
            + '2446494189019075159822930571858728009485237489829138626896756141'
            + '8738958337632249177044975686477011571044266'
        ).abs().toString(),
        '4335932900105904896711358192862595934265493066663240086797820842922446'
        + '49418901907515982293057185872800948523748982913862689675614187389583'
        + '37632249177044975686477011571044266'
    );
    
    assert.eql(
        bigint(
            '-43359329001059048967113581928625959342654930666632400867978208429'
            + '2244649418901907515982293057185872800948523748982913862689675614'
            + '18738958337632249177044975686477011571044266'
        ).abs().toString(),
        '4335932900105904896711358192862595934265493066663240086797820842922446'
        + '49418901907515982293057185872800948523748982913862689675614187389583'
        + '37632249177044975686477011571044266'
    );
};

exports.neg = function () {
    assert.eql(
        bigint(
            '433593290010590489671135819286259593426549306666324008679782084292'
            + '2446494189019075159822930571858728009485237489829138626896756141'
            + '8738958337632249177044975686477011571044266'
        ).neg().toString(),
        '-433593290010590489671135819286259593426549306666324008679782084292244'
        + '64941890190751598229305718587280094852374898291386268967561418738958'
        + '337632249177044975686477011571044266'
    );
    
    assert.eql(
        bigint(
            '-43359329001059048967113581928625959342654930666632400867978208429'
            + '2244649418901907515982293057185872800948523748982913862689675614'
            + '18738958337632249177044975686477011571044266'
        ).neg().toString(),
        '4335932900105904896711358192862595934265493066663240086797820842922446'
        + '49418901907515982293057185872800948523748982913862689675614187389583'
        + '37632249177044975686477011571044266'
    );
};

exports.mod = function () {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            if (!isNaN(i % j)) {
                var ks = (i % j).toString();
                assert.eql(bigint(i).mod(j).toString(), ks);
                assert.eql(bigint(i).mod(js).toString(), ks);
                assert.eql(bigint(i).mod(bigint(j)).toString(), ks);
                assert.eql(bigint.mod(i, j).toString(), ks);
            }
        }
    }
    
    assert.eql(
        bigint('486541542410442549118519277483401413')
            .mod('1802185856709793916115771381388554')
            .toString()
        ,
        '1753546955507985683376775889880387'
    );
};

exports.cmp = function () {
    for (var i = -10; i <= 10; i++) {
        var bi = bigint(i);
        
        for (var j = -10; j <= 10; j++) {
            [ j, bigint(j) ].forEach(function (jj) {
                assert.eql(bi.lt(jj), i < j);
                assert.eql(bi.le(jj), i <= j);
                assert.eql(bi.eq(jj), i === j);
                assert.eql(bi.ne(jj), i !== j);
                assert.eql(bi.gt(jj), i > j);
                assert.eql(bi.ge(jj), i >= j);
            });
        }
    }
};

exports.powm = function () {
    var twos = [ 2, '2', bigint(2), bigint('2') ]
    var tens = [ 100000, '100000', bigint(100000), bigint(100000) ];
    twos.forEach(function (two) {
        tens.forEach(function (t) {
            assert.eql(
                bigint('111111111').powm(two, t).toString(),
                '54321'
            );
        });
    });
    
    assert.eql(
        bigint('624387628734576238746587435')
            .powm(2732, '457676874367586')
            .toString()
        ,
        '335581885073251'
    );
};

exports.pow = function () {
    [ 2, '2', bigint(2), bigint('2') ].forEach(function (two) {
        assert.eql(
            bigint('111111111').pow(two).toString(),
            '12345678987654321'
        );
    });
    
    assert.eql(
        bigint('3487438743234789234879').pow(22).toString(),
        '861281136448465709000943928980299119292959327175552412961995332536782980636409994680542395362634321718164701236369695670918217801815161694902810780084448291245512671429670376051205638247649202527956041058237646154753587769450973231275642223337064356190945030999709422512682440247294915605076918925272414789710234097768366414400280590151549041536921814066973515842848197905763447515344747881160891303219471850554054186959791307149715821010152303317328860351766337716947079041'
    );
};

exports.and = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = (i & j).toString();
            assert.eql(bigint(i).and(j).toString(), ks);
            assert.eql(bigint(i).and(js).toString(), ks);
            assert.eql(bigint(i).and(bigint(j)).toString(), ks);
            assert.eql(bigint.and(i, j).toString(), ks);
        }
    }
};

exports.or = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = (i | j).toString();
            assert.eql(bigint(i).or(j).toString(), ks);
            assert.eql(bigint(i).or(js).toString(), ks);
            assert.eql(bigint(i).or(bigint(j)).toString(), ks);
            assert.eql(bigint.or(i, j).toString(), ks);
        }
    }
};

exports.xor = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = (i ^ j).toString();
            assert.eql(bigint(i).xor(j).toString(), ks);
            assert.eql(bigint(i).xor(js).toString(), ks);
            assert.eql(bigint(i).xor(bigint(j)).toString(), ks);
            assert.eql(bigint.xor(i, j).toString(), ks);
        }
    }
};

exports.rand = function () {
    for (var i = 1; i < 1000; i++) {
        var x = bigint(i).rand().toNumber();
        assert.ok(0 <= x  && x < i);
        
        var y = bigint(i).rand(i + 10).toNumber();
        assert.ok(i <= y && y < i + 10);
        
        var z = bigint.rand(i, i + 10).toNumber();
        assert.ok(i <= z && z < i + 10);
    }
};

exports.primes = function () {
    var ps = { 2 : true, 3 : true, 5 : true, 7 : true };
    for (var i = 0; i <= 10; i++) {
        assert.eql(bigint(i).probPrime(), ps[i] ? true : false);
    }
    
    var ns = {
        2 : 3,
        3 : 5,
        15313 : 15319,
        222919 : 222931,
        611939 : 611951,
        334214459 : '334214467',
        961748927 : '961748941',
        9987704933 : '9987704953',
    };
    
    Object.keys(ns).forEach(function (n) {
        assert.eql(
            bigint(n).nextPrime().toString(),
            ns[n].toString()
        );
    });
    
    var uniques = [
        '3', '11', '37', '101', '9091', '9901', '333667', '909091', '99990001',
        '999999000001', '9999999900000001', '909090909090909091',
        '1111111111111111111', '11111111111111111111111',
        '900900900900990990990991',
    ];
    
    var wagstaff = [
        '3', '11', '43', '683', '2731', '43691', '174763', '2796203',
        '715827883', '2932031007403', '768614336404564651',
        '201487636602438195784363', '845100400152152934331135470251',
        '56713727820156410577229101238628035243',
    ];
    
    var big = [
        '4669523849932130508876392554713407521319117239637943224980015676156491',
        '54875133386847519273109693154204970395475080920935355580245252923343305939004903',
        '204005728266090048777253207241416669051476369216501266754813821619984472224780876488344279',
        '2074722246773485207821695222107608587480996474721117292752992589912196684750549658310084416732550077',
        '5628290459057877291809182450381238927697314822133923421169378062922140081498734424133112032854812293',
    ];
    
    [ uniques, wagstaff, big ].forEach(function (xs) {
        xs.forEach(function (x) {
            var p = bigint(x).probPrime();
            assert.ok(p === true || p === 'maybe');
        });
    });
};

exports.invertm = function () {
    // numbers from http://www.itl.nist.gov/fipspubs/fip186.htm appendix 5
    var q = bigint('b20db0b101df0c6624fc1392ba55f77d577481e5', 16);
    var k = bigint('79577ddcaafddc038b865b19f8eb1ada8a2838c6', 16);
    var kinv = k.invertm(q);
    assert.eql(kinv.toString(16), '2784e3d672d972a74e22c67f4f4f726ecc751efa');
};

exports.shift = function () {
    assert.eql(bigint(37).shiftLeft(2).toString(), (37 << 2).toString()); // 148
    assert.eql(bigint(37).shiftRight(2).toString(), (37 >> 2).toString()); // 9
    
    assert.equal(
        bigint(2).pow(Math.pow(2,10)).shiftRight(4).toString(),
        bigint(2).pow(Math.pow(2,10)).div(16).toString()
    );
};

exports.mod = function () {
    assert.eql(bigint(55555).mod(2).toString(), '1');
    assert.eql(
        bigint('1234567').mod(
            bigint('4321')
        ).toNumber(), 
        1234567 % 4321
    );
};

exports.bitlength = function () {
  
  var bl = bigint(
    '433593290010590489671135819286259593426549306666324008679782084292'
      + '2446494189019075159822930571858728009485237489829138626896756141'
      + '873895833763224917704497568647701157104426'
  ).bitLength();

  assert.equal(bl> 0, true);
};

exports.gcd = function () {
  var b1 = bigint('234897235923342343242');
  var b2 = bigint('234790237101762305340234');
  var expected = bigint('6');

  assert.equal(b1.gcd(b2).toString(), expected.toString());
};

if (process.argv[1] === __filename) {
    assert.eql = assert.deepEqual;
    Object.keys(exports).forEach(function (ex) {
        exports[ex]();
    });
}
