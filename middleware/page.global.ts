import pixel from "../assets/custom/routePixel";

export default defineNuxtRouteMiddleware((to, from) => {
  
    const getDepth = (path:string) => {
        return path.split("/").filter(seg => seg.length > 0).length;
    }

    const toDepth = getDepth(to.path);
    const fromDepth = getDepth(from.path);

    pixel();

    if (toDepth > fromDepth) {
        to.meta.pageTransition = { name: 'page-left', mode: "out-in" }
        from.meta.pageTransition = { name: 'page-left', mode: "out-in"  }
    } else {
        to.meta.pageTransition = { name: 'page-right', mode: "out-in"  }
        from.meta.pageTransition = { name: 'page-right', mode: "out-in"  }
    }
})