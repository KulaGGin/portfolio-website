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
    ]
}