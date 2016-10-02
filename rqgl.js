// rqgl.js
function rqGL( canvasid )
{
    var ctx = null;

    var canvas = document.getElementById( canvasid );
    ctx = canvas.getContext( "webgl" );

    rqGL.GLContext = ctx;
}

// クリア
rqGL.prototype.clear = function()
{
    rqGL.GLContext.clearColor(0.0, 0.0, 0.0, 1.0);
    rqGL.GLContext.clear( rqGL.GLContext.COLOR_BUFFER_BIT );
}

// シェーダーコンパイル
rqGL.prototype.compileVertexShaderById = function( id )
{
	var elem = document.getElementById(id);
	return this.compileVertexShader( elem.text );
}
rqGL.prototype.compileVertexShader = function( text )
{
    var shader = rqGL.GLContext.createShader( rqGL.GLContext.VERTEX_SHADER );
    rqGL.GLContext.shaderSource( shader, text );
    rqGL.GLContext.compileShader( shader );

    if( !rqGL.GLContext.getShaderParameter(shader, rqGL.GLContext.COMPILE_STATUS) )
    {
        alert( rqGL.GLContext.getShaderInfoLog(shader) );
    }
    return shader;
}

// シェーダーコンパイル
rqGL.prototype.compileFragmentShaderById = function( id )
{
	var elem = document.getElementById(id);
	return this.compileFragmentShader( elem.text );
}
rqGL.prototype.compileFragmentShader = function( text )
{
    var shader = rqGL.GLContext.createShader( rqGL.GLContext.FRAGMENT_SHADER );
    rqGL.GLContext.shaderSource( shader, text );
    rqGL.GLContext.compileShader( shader );

    if( !rqGL.GLContext.getShaderParameter(shader, rqGL.GLContext.COMPILE_STATUS) )
    {
        alert( rqGL.GLContext.getShaderInfoLog(shader) );
    }
    return shader;
}

// 頂点バッファ作成
rqGL.prototype.createVertexBuffer = function( data )
{
    var vb = rqGL.GLContext.createBuffer();
    rqGL.GLContext.bindBuffer( rqGL.GLContext.ARRAY_BUFFER, vb );
    rqGL.GLContext.bufferData( rqGL.GLContext.ARRAY_BUFFER, new Float32Array(data), rqGL.GLContext.STATIC_DRAW );
    rqGL.GLContext.bindBuffer( rqGL.GLContext.ARRAY_BUFFER, null );
    return vb;
}

// 頂点バッファ作成
rqGL.prototype.createDynamicVertexBuffer = function( size )
{
    var vb = rqGL.GLContext.createBuffer();
    rqGL.GLContext.bindBuffer( rqGL.GLContext.ARRAY_BUFFER, vb );
    rqGL.GLContext.bufferData( rqGL.GLContext.ARRAY_BUFFER, new Float32Array(size), rqGL.GLContext.DYNAMIC_DRAW );
    rqGL.GLContext.bindBuffer( rqGL.GLContext.ARRAY_BUFFER, null );
    return vb;
}

// インデクスバッファ作成
rqGL.prototype.createIndexBuffer = function( data )
{
    var ib = rqGL.GLContext.createBuffer();
    rqGL.GLContext.bindBuffer( rqGL.GLContext.ELEMENT_ARRAY_BUFFER, ib );
    rqGL.GLContext.bufferData( rqGL.GLContext.ELEMENT_ARRAY_BUFFER, new Int16Array(data), rqGL.GLContext.STATIC_DRAW );
    rqGL.GLContext.bindBuffer( rqGL.GLContext.ELEMENT_ARRAY_BUFFER, null );
    return ib;
}

// 定数
rqGL.prototype.ELEM_POSITION = 0;
rqGL.prototype.ELEM_NORMAL   = 1;
rqGL.prototype.ELEM_COLOR    = 2;
rqGL.prototype.ELEM_TEXCOORD = 3;
rqGL.prototype.ELEM_ENUM_MAX = 4;

rqGL.prototype.TYPE_FLOAT    = 0;
rqGL.prototype.TYPE_UINT_N   = 1;
rqGL.prototype.TYPE_USHORT_N = 2;

rqGL.prototype.UNIFORMTYPE_FLOAT1 = function( ctx, loc, val ) { ctx.uniform1fv( loc, val ); };
rqGL.prototype.UNIFORMTYPE_FLOAT2 = function( ctx, loc, val ) { ctx.uniform2fv( loc, val ); };
rqGL.prototype.UNIFORMTYPE_FLOAT3 = function( ctx, loc, val ) { ctx.uniform3fv( loc, val ); };
rqGL.prototype.UNIFORMTYPE_FLOAT4 = function( ctx, loc, val ) { ctx.uniform4fv( loc, val ); };
rqGL.prototype.UNIFORMTYPE_MATRIX33 = function( ctx, loc, val ) { ctx.uniformMatrix3fv( loc, val ); };
rqGL.prototype.UNIFORMTYPE_MATRIX44 = function( ctx, loc, val ) { ctx.uniformMatrix4fv( loc, val ); };
rqGL.prototype.UNIFORMTYPE_FLOAT1_ARRAY = function( ctx, loc, val, siz ) { for( var i = 0; i < siz; ++i ) { var idx = i * 1; ctx.uniform1f( loc+i, val[idx] ); } };
rqGL.prototype.UNIFORMTYPE_FLOAT2_ARRAY = function( ctx, loc, val, siz ) { for( var i = 0; i < siz; ++i ) { var idx = i * 2; ctx.uniform2f( loc+i, val[idx+0], val[idx+1] ); } };
rqGL.prototype.UNIFORMTYPE_FLOAT3_ARRAY = function( ctx, loc, val, siz ) { for( var i = 0; i < siz; ++i ) { var idx = i * 3; ctx.uniform3f( loc+i, val[idx+0], val[idx+1], val[idx+2] ); } };
rqGL.prototype.UNIFORMTYPE_FLOAT4_ARRAY = function( ctx, loc, val, siz ) { for( var i = 0; i < siz; ++i ) { var idx = i * 4; ctx.uniform4f( loc+i, val[idx+0], val[idx+1], val[idx+2], val[idx+3] ); } };
//rqGL.prototype.UNIFORMTYPE_MATRIX33_ARRAY = function( ctx, loc, val, siz ) { ctx.uniformMatrix3fv( loc, val ); };
//rqGL.prototype.UNIFORMTYPE_MATRIX44_ARRAY = function( ctx, loc, val, siz ) { ctx.uniformMatrix4fv( loc, val ); };

rqGL.prototype.PRIMITIVETYPE_TRIANGLES = 0;
rqGL.prototype.PRIMITIVETYPE_TRIANGLE_STRIP = 1;

// 頂点宣言クラス
rqGL.prototype.InputLayout = function()
{
    this.Layout = [];
};

// 頂点宣言クラス：エレメント追加
rqGL.prototype.InputLayout.prototype.addElement = function( elem , type, size )
{
    this.Layout.push( {Element:elem,Type:type,Size:size} );
};

// 頂点宣言クラス：作成
rqGL.prototype.createInputLayout = function()
{
    return new rqGL.prototype.InputLayout();
};

// シェーダープログラムクラス
rqGL.prototype.ShaderProgram = function( vs, fs )
{
    var program = rqGL.GLContext.createProgram();
    
    rqGL.GLContext.attachShader(program, vs);
    rqGL.GLContext.attachShader(program, fs);
    rqGL.GLContext.linkProgram(program);
    
    // シェーダのリンクが正しく行なわれたかチェック
    if( !rqGL.GLContext.getProgramParameter(program, rqGL.GLContext.LINK_STATUS) )
    {
        alert( rqGL.GLContext.getProgramInfoLog(program) );
    }

    this.Program = program;
    this.UniformInfo = {};
}

// シェーダープログラム：作成
rqGL.prototype.createShaderProgram = function( vs, fs )
{
    return new rqGL.prototype.ShaderProgram( vs, fs );
};

// シェーダープログラム：シェーダー定数追加
rqGL.prototype.ShaderProgram.prototype.addUniform = function( name, type )
{
    var loc = rqGL.GLContext.getUniformLocation( this.Program, name );
    this.UniformInfo[name] = {Location:loc,Func:type,Size:1};
}
// シェーダープログラム：シェーダー定数(配列)追加
rqGL.prototype.ShaderProgram.prototype.addUniformArray = function( name, type, size )
{
    var loc = rqGL.GLContext.getUniformLocation( this.Program, name + "[0]" );
    this.UniformInfo[name] = {Location:loc,Func:type,Size:size};
}

// バッチクラス
rqGL.prototype.Batch = function( primitivetype, vb, ib, shader, inputlayout, vertexcount )
{
    this.PrimitiveType = primitivetype;
    this.VertexCount = vertexcount;
    this.VertexBuffer = vb;
    this.IndexBuffer = ib;
    this.Shader = shader;
    this.InputLayout = inputlayout;
    this.NativeInputLayout = null;
    this.Stride = 0;

    this.precompute();

    this.Uniform = {};
};

// バッチクラス：作成
rqGL.prototype.createBatch = function( primitivetype, vb, ib, shader, inputlayout, vertexcount )
{
    return new rqGL.prototype.Batch( primitivetype, vb, ib, shader, inputlayout, vertexcount );
};

// バッチクラス：事前処理
rqGL.prototype.Batch.prototype.precompute = function()
{
    this.NativeInputLayout = [];
    this.Stride = 0;

    var ctx = rqGL.GLContext;

    switch( this.PrimitiveType )
    {
	case rqGL.prototype.PRIMITIVETYPE_TRIANGLES:
        this.NativePrimitiveType =  ctx.TRIANGLES;
        break;
	case rqGL.prototype.PRIMITIVETYPE_TRIANGLE_STRIP:
        this.NativePrimitiveType =  ctx.TRIANGLE_STRIP;
        break;
    }

    var il = this.InputLayout.Layout;

    var counter = [];
    for( var i = 0; i < rqGL.prototype.ELEM_ENUM_MAX; ++i )
    {
        counter.push( 0 );
    }
    for( var i = 0; i < il.length; ++i )
    {
        var attr;
        var cnt = counter[il[i].Element];
        counter[il[i].Element]++;

        switch( il[i].Element )
        {
        case rqGL.prototype.ELEM_POSITION:
            attr = ctx.getAttribLocation(this.Shader.Program, "position" );        
            break;
        case rqGL.prototype.ELEM_NORMAL:
            attr = ctx.getAttribLocation(this.Shader.Program, "normal" + cnt );   
            break;
        case rqGL.prototype.ELEM_COLOR:
            attr = ctx.getAttribLocation(this.Shader.Program, "color" + cnt );  
            break;
        case rqGL.prototype.ELEM_TEXCOORD:
            attr = ctx.getAttribLocation(this.Shader.Program, "texcoord" + cnt );        
            break;
        }
        
        var type;
        var normalized;
        var size;
        switch( il[i].Type )
        {
        case rqGL.prototype.TYPE_FLOAT:
            type = ctx.FLOAT;
            normalized = false;
            size = 4;
            break;
        case rqGL.prototype.TYPE_UINT_N:
            type = ctx.UNSIGNED_INT;
            normalized = true;
            size = 4;
            break;
        case rqGL.prototype.TYPE_USHORT_N:
            type = ctx.UNSIGNED_SHORT;
            normalized = true;
            size = 2;
            break;
        }

        this.NativeInputLayout.push( {Attribute:attr,Type:type,Normalized:normalized,Size:il[i].Size} );
        this.Stride += size * il[i].Size;
    }
}

// バッチクラス：描画
rqGL.prototype.Batch.prototype.draw = function()
{
    var ctx = rqGL.GLContext;
    ctx.bindBuffer( ctx.ARRAY_BUFFER, this.VertexBuffer );
    ctx.bindBuffer( ctx.ELEMENT_ARRAY_BUFFER, this.IndexBuffer );

    ctx.useProgram( this.Shader.Program );

    for( var i = 0; i < this.NativeInputLayout.length; ++i )
    {
        var nil = this.NativeInputLayout[i];
        ctx.enableVertexAttribArray( nil.Attribute );
        ctx.vertexAttribPointer( nil.Attribute, nil.Size, nil.Type, nil.Normalized, this.Stride, 0 );
    }

    for( key in this.Uniform )
    {
        if( key in this.Shader.UniformInfo )
        {
            var ui = this.Shader.UniformInfo[key];
            ui.Func( ctx, ui.Location, this.Uniform[key], ui.Size );
        }
    }

    ctx.drawElements( this.NativePrimitiveType, this.VertexCount, ctx.UNSIGNED_SHORT, 0 );

    for( var i = 0; i < this.NativeInputLayout.length; ++i )
    {
        var nil = this.NativeInputLayout[i];
        ctx.disableVertexAttribArray( nil.Attribute );
    }
}

// debug
function debugprint( text )
{
    var elem = document.createElement("div");
    elem.innerHTML = text;
    document.body.appendChild( elem );
}
