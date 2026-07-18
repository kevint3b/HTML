
    // Navegación animada: mover indicador y mostrar panel con animación
    document.addEventListener('DOMContentLoaded', function(){
        const links = document.querySelectorAll('.nav__link');
        const indicator = document.querySelector('.nav__indicator');
        //const panels = document.querySelectorAll('.panel');

        function updateIndicator(el){
            const rect = el.getBoundingClientRect();
            const parentRect = el.closest('.nav').getBoundingClientRect();
            indicator.style.width = rect.width + 'px';
            indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
        }

        // Inicializar indicador en el elemento activo
        const initial = document.querySelector('.nav__link.active');
        if(initial) updateIndicator(initial);
//aqui hay un error de usuabiliad
        links.forEach(link => {
            link.addEventListener('click', function(e){
                e.preventDefault();
                // toggle active class on links
                links.forEach(l=>l.classList.remove('active'));
                this.classList.add('active');

                // move indicator with a small timeout to allow layout
                updateIndicator(this);

                // show corresponding panel with animation
                const target = this.getAttribute('href').slice(1);
                panels.forEach(p => {
                    if(p.id === target){
                        p.classList.add('active');
                    } else {
                        p.classList.remove('active');
                    }
                });
            });
        });

        // Reposicionar indicador en resize
        window.addEventListener('resize', ()=>{
            const active = document.querySelector('.nav__link.active');
            if(active) updateIndicator(active);
        });
    });
