using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;

//[assembly: OwinStartup(typeof(TheMightyTreeOfSienceV2.Startup))]

namespace TheMightyTreeOfSienceV2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
