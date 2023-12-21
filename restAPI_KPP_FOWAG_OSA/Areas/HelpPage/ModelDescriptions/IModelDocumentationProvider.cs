using System;
using System.Reflection;

namespace restAPI_KPP_FOWAG_OSA.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}