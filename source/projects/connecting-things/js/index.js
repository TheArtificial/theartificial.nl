

    var layout = {
        container: document.getElementById('actors'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: Actors,
    };

    var anim1 = {
        container: document.getElementById('step1'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: AppCloud,
    };

    var anim2 = {
        container: document.getElementById('step2'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: ThingBroadcasts,
    };

    var anim3 = {
        container: document.getElementById('step3'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: OSListens,
    };

    var anim4 = {
        container: document.getElementById('step4'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: ThingOSPairs,
    };

    var anim5 = {
        container: document.getElementById('step5'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: ThingOSVerified,
    };


    var anim;

    anim = lottie.loadAnimation(layout);
    anim = lottie.loadAnimation(anim1);
    anim = lottie.loadAnimation(anim2);
    anim = lottie.loadAnimation(anim3);
    anim = lottie.loadAnimation(anim4);
    anim = lottie.loadAnimation(anim5);
