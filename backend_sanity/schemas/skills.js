export default{
    name:'skills',
    title:'Skills',
    type: 'document',
    fields:[
        {
            name:'name',
            title:'Name',
            type:'string'
        },
        {
            name:'description',
            title:'description',
            type:'string'
        },
        {
            name:'bgColor',
            title:'BgColor',
            type:'string'
        },
        {
            name:'icon',
            title:'Icon',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
        {
            name: 'works',
            title: 'Works',
            type: 'array',
            of: [{
                    type: 'reference',
                    to: [
                        {type: 'works'},
                    ]
                }
            ]
        },
        {
            name: 'educationalMaterials',
            title: 'Educational Materials',
            type: 'array',
            of: [{
                type: 'reference',
                to: [
                    {type: 'educationalMaterials'},
                ]
            }
            ]
        },
        {
            name:'knowledgeIndex',
            title:'Knowledge Index',
            type:'text'
        },
    ]
}