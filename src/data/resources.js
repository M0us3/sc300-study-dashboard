export const domains = [
 {id:'identities', name:'User identities',weight:'20–25%',summary:'Users, groups, roles, hybrid & external identity'},
 {id:'access',name:'Authentication & access',weight:'25–30%',summary:'MFA, Conditional Access & Identity Protection'},
 {id:'workloads',name:'Workload identities',weight:'20–25%',summary:'Applications, service principals & managed identities'},
 {id:'governance',name:'Identity governance',weight:'20–25%',summary:'PIM, access reviews & entitlement management'}
]
const labs='https://microsoftlearning.github.io/SC-300-Identity-and-Access-Administrator/'
const course='https://learn.microsoft.com/en-us/training/courses/sc-300t00'
const guide='https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300'
export const resources=[
 {id:'users-groups',domain:'identities',kind:'Lab',mins:30,title:'Create users and groups in Microsoft Entra ID',source:'Microsoft official labs',url:labs,detail:'Create users, groups, and assignments in a test tenant.'},
 {id:'tenant',domain:'identities',kind:'Lab',mins:25,title:'Tenant and group settings',source:'Microsoft official labs',url:labs,detail:'Explore group management and administration.'},
 {id:'hybrid',domain:'identities',kind:'Lab',mins:35,title:'Explore hybrid identity',source:'Microsoft official labs',url:labs,detail:'Review prerequisites; hybrid labs can require infrastructure.'},
 {id:'identity-read',domain:'identities',kind:'Read',mins:20,title:'Identity administration reading',source:'Microsoft Learn',url:course,detail:'Review users, guest access and hybrid identity.'},
 {id:'udemy',domain:'identities',kind:'Video',mins:25,title:'John Christopher SC-300 Udemy course',source:'Udemy',url:'https://www.udemy.com/course/sc-300-course-microsoft-identity-and-access-administrator/',detail:'Watch the lesson matching today’s lab.'},
 {id:'mfa',domain:'access',kind:'Lab',mins:25,title:'Configure MFA and authentication methods',source:'Microsoft official labs',url:labs,detail:'Practice with a test identity, not your everyday account.'},
 {id:'ca',domain:'access',kind:'Lab',mins:35,title:'Implement Conditional Access',source:'Microsoft official labs',url:labs,detail:'Use a test tenant and protect emergency access.'},
 {id:'ca-read',domain:'access',kind:'Read',mins:20,title:'Conditional Access overview',source:'Microsoft Learn',url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview',detail:'Understand policies, signals and controls.'},
 {id:'savill',domain:'access',kind:'Video',mins:25,title:'John Savill SC-300 playlist',source:'John Savill / YouTube',url:'https://www.youtube.com/playlist?list=PLlVtbbG169nGj4rfaMUQiKiBZNDlxoo0y',detail:'Review the video for your current topic. Check newer exam changes.'},
 {id:'app',domain:'workloads',kind:'Lab',mins:30,title:'Configure an enterprise application',source:'Microsoft official labs',url:labs,detail:'App assignments, consent and service principals.'},
 {id:'app-read',domain:'workloads',kind:'Read',mins:20,title:'Applications and service principals',source:'Microsoft Learn',url:'https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals',detail:'Connect app registrations to enterprise apps and identity.'},
 {id:'managed',domain:'workloads',kind:'Lab',mins:30,title:'Workload identity and managed identity lab',source:'Microsoft official labs',url:labs,detail:'Review labs and licensing before starting.'},
 {id:'packages',domain:'governance',kind:'Lab',mins:30,title:'Create an access package',source:'Microsoft official labs',url:labs,detail:'Practice entitlement management in a test tenant.'},
 {id:'pim',domain:'governance',kind:'Lab',mins:30,title:'Privileged Identity Management',source:'Microsoft official labs',url:labs,detail:'Explore eligible roles, activation and licensing.'},
 {id:'reviews',domain:'governance',kind:'Lab',mins:25,title:'Run an access review',source:'Microsoft official labs',url:labs,detail:'Understand review approvals and consequences.'},
 {id:'channel9',domain:'governance',kind:'Video',mins:20,title:'Microsoft Learn Shows / Channel 9 SC-300',source:'Microsoft Learn Shows',url:'https://learn.microsoft.com/en-us/shows/on-demand-instructor-led-training-series/sc-300-module-7',detail:'Watch an official instructor-led module.'},
 {id:'objectives',domain:'governance',kind:'Read',mins:15,title:'Current exam skills outline',source:'Microsoft Learn',url:guide,detail:'Check measured skills and topic gaps.'},
 {id:'practice',domain:'access',kind:'Practice',mins:25,title:'SC-300 practice assessment',source:'Microsoft Learn',url:'https://learn.microsoft.com/en-us/credentials/certifications/exams/sc-300/',detail:'Use the official practice resources.'}
]